import { useEffect } from 'react';

function MauticTrackingScript(): null {
  const mauticUrl: string = import.meta.env.VITE_MAUTIC_URL;

  // use effect here is nessessary because it will avoid multiple script tag being added on every reload
  useEffect(() => {
    const mauticScript = document.createElement('script');
    mauticScript.async = true; // async here to make it donwload in background without stoping other stuff
    mauticScript.innerHTML = `
      (function(w,d,t,u,n,a,m){
          w['MauticTrackingObject']=n;
          w[n]=w[n]||function(){
              (w[n].q=w[n].q||[]).push(arguments)
          },a=d.createElement(t),
          m=d.getElementsByTagName(t)[0];
          a.async=1;
          a.src=u;
          m.parentNode.insertBefore(a,m)
      })(window, document, 'script', '${mauticUrl}mtc.js', 'mt');

      mt('send', 'pageview');
    `;

    // append the script to the of body
    document.body.appendChild(mauticScript);
  }, []);

  return null; // not return anything
}

export default MauticTrackingScript;