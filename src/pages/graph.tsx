import React, { useEffect, useRef } from 'react';
import { instance } from '@viz-js/viz';
import { useRouter } from 'next/router';

const Graph = () => {
  const router = useRouter();
  const dot = Array.isArray(router.query.dot) ? router.query.dot[0] : router.query.dot; 
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && dot) {
      instance().then(viz => {
        const svgElement = viz.renderSVGElement(dot);
        containerRef.current!.innerHTML = ''; // Clear any previous content
        containerRef.current!.appendChild(svgElement as Node); // Append the SVG element
      }).catch((error: Error) => {
        console.error('Error rendering graph:', error);
      });
    }
  }, [dot]);


  return <div ref={containerRef} />;
};

export default Graph;
