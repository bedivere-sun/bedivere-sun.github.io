function modHTMLNode(id, htmlText){

    const targetNode = document.getElementById(id);

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationList){
        if(mutation.type === 'characterData' && mutation.target === targetNode){
            //如果需要，发生内容变动时，可以指定函数或执行过程。
        }
      }
    });

    const config = { characterData: true };
    observer.observe(targetNode, config);

    document.getElementById(id).innerHTML = htmlText;
}