//https://github.com/mdaines/viz-js/tree/v3/packages/website
import { useState, useEffect, useMemo, useRef } from "react";
 import ReloadablePromiseWorker, { TerminatedError } from "../reloadable-promise-worker.js";
 import { useRouter } from 'next/router';


import OutputToolbar from "../components/OutputToolbar.jsx";
import Output from "../components/Output.jsx";
import Errors from "../components/Errors.jsx";
let worker = null;


 
 
if (typeof window !== 'undefined') {
  // Only create the worker in the browser environment
  worker = new ReloadablePromiseWorker(() => new Worker(new URL('../worker.js', import.meta.url), { type: 'module' }));
}


function render(src, options) {
  let effectiveFormat = options.format == "svg-image" ? "svg" : options.format;

  return worker
    .postMessage({ src, options: { ...options, format: effectiveFormat } })
    .then(result => {
      return { ...result, format: options.format };
    });
}

export default function VizWebSite() {
  const router = useRouter();
  const dot = Array.isArray(router.query.dot) ? router.query.dot[0] : router.query.dot; 
  const [src, setSrc] = useState(dot);
   const [options, setOptions] = useState({ engine: "dot", format: "svg-image" });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const [zoom, setZoom] = useState("fit");
  const [isValid, setValid] = useState(false);
  const imageZoomRef = useRef(null);
  const editorRef = useRef(null);
 
 
  // function handleSrcChange(newSrc) {
  //   setSrc(newSrc);
  //   handleSrcChangeDebounced(newSrc);
  // }

  function handleOptionChange(k, v) {
    setOptions(o => ({ ...o, [k]: v }));
  }

  // function handleLoadExample(example) {
  //   editorRef.current?.setValue(example);
  //   setSrc(example);
  //   setDebouncedSrc(example);
  // }

  // const handleSrcChangeDebounced = useMemo(() => {
  //   return debounce(setDebouncedSrc, 750);
  // }, []);

  useEffect(() => {
    let ignore = false;

    setValid(false);

    render(src, options)
      .then(nextResult => {
        if (ignore) {
          return;
        }

        if (nextResult.status == "success") {
          setResult(nextResult);
          setValid(true);
        }

        setErrors(nextResult.errors);
      })
      .catch(error => {
        if (!(error instanceof TerminatedError)) {
          setErrors([
            { level: "error", message: error.toString() }
          ]);
        }
      });

    return () => {
      ignore = true;
    };
  }, [src, options]);

  const zoomEnabled = result?.format == "svg-image";

  return (
    <>
      {/* <EditorToolbar onLoadExample={handleLoadExample}  />
      <Editor defaultValue={src} onChange={handleSrcChange} ref={editorRef} /> */}
      <OutputToolbar options={options} onOptionChange={handleOptionChange} zoomEnabled={zoomEnabled} zoom={zoom} onZoomChange={setZoom} onZoomIn={() => imageZoomRef.current?.zoomIn()} onZoomOut={() => imageZoomRef.current?.zoomOut()} />
      <Output result={result} zoom={zoom} imageZoomRef={imageZoomRef} onZoomChange={setZoom} isValid={isValid} />
      <Errors errors={errors} />
    </>
  );
}
