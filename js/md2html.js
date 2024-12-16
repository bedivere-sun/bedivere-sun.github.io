    // 这就是一个肥肠基础的MD转HTML，用不着表格和别的乱七八糟的，就是为了纯静态站上转换，不设置乱七八糟的环境。

// 转换代码块
function convertCodeBlocks(markdownText) {
    var regex = /```([\s\S]*?)```/g;

    var htmlText = markdownText.replace(regex, function (match, codeContent) {
      return '<code>' + codeContent + '</code>';
    });
    htmlText = htmlText.replace(/`([^`]+)`/g, '<em>$1</em>');
    return htmlText;
}

// 转换标题
function convertTitle(markdownText) {

    var htmlText = markdownText.replace(/^# (.*)/gm, '<h1>$1</h1>');
    htmlText = htmlText.replace(/^## (.*)/gm, '<h2>$1</h2>');
    htmlText = htmlText.replace(/^### (.*)/gm, '<h3>$1</h3>');
    htmlText = htmlText.replace(/^#### (.*)/gm, '<h4>$1</h4>');
    htmlText = htmlText.replace(/^##### (.*)/gm, '<h5>$1</h5>');
    htmlText = htmlText.replace(/^###### (.*)/gm, '<h6>$1</h6>');
    return htmlText;
}

//转换http、https、FTP链接为超链
function markdownToHyperlink(markdownText) {
    let hyperlinkText = markdownText;
    const urlRegex = /(https?:\/\/|ftp:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    hyperlinkText = hyperlinkText.replace(urlRegex, '<a target="_blank" href="$&">$&</a>');
    return hyperlinkText;
}

function md2HTML(markdownText) {
    let htmlText = markdownText;

    // 先转换code块
    htmlText = convertCodeBlocks(htmlText);

    //转换标题
    htmlText = convertTitle(htmlText);

    // 转换代码块
    //htmlText = htmlText.replace(/```([\s\S]*?)```/g, '<code>$1</code>>');
    // 转换段落
    htmlText = htmlText.replace(/([^\n]+)/g, '<p>$1</p>');
    // 转换无序列表
    htmlText = htmlText.replace(/^[-*+] (.*)/gm, '<li>$1</li>');
    htmlText = htmlText.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    // 转换有序列表
    htmlText = htmlText.replace(/^\d+\. (.*)/gm, '<li>$1</li>');
    htmlText = htmlText.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>');
    // 转换链接
    htmlText = htmlText.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
    // 转换图片
    htmlText = htmlText.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');
    // 转换强调（斜体）
    htmlText = htmlText.replace(/([*_])(.*?)\1/g, '<em>$2</em>');
    // 转换加粗
    htmlText = htmlText.replace(/([*_]{2})(.*?)\1/g, '<strong>$2</strong>');

    htmlText = markdownToHyperlink(htmlText);
    
    // 水平线
    htmlText = htmlText.replace(/(-{5,})/g, '<hr />');


    //清除不该有的空代码块
    htmlText = htmlText.replace(/<p><code><\/code><\/p>/g, '');

    return htmlText;
}