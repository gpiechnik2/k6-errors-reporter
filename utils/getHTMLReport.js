const getMarkdownReport = require('./getMarkdownReport')


function getHTMLReport(outputJsonFileName) {
    const markdownReport = getMarkdownReport(outputJsonFileName)
    return `<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="github-markdown.css">
<style>
    * {
        background-color: #0d1117;
        color: #c9d1d9;
    }
        
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        color: #c9d1d9;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    }
    
    .markdown-body a {
        background-color: transparent;
        color: #58a6ff;
        text-decoration: none;
    }
        
    .markdown-body p {
        margin-top: 0;
        margin-bottom: 10px;
    }      
   
    .markdown-body h1 {
        margin: .67em 0;
        font-weight: 600;
        padding-bottom: .3em;
        font-size: 2em;
        border-bottom: 1px solid #21262d;
    }
    
    .markdown-body h2 {
        font-weight: 600;
        padding-bottom: .3em;
        font-size: 1.5em;
        border-bottom: 1px solid #21262d;
    }
    
    .markdown-body table th {
        font-weight: 600;
    }
          
    .markdown-body table th,
    .markdown-body table td {
        padding: 6px 13px;
        border: 1px solid #30363d;
    }
          
    .markdown-body table tr {
        background-color: #0d1117;
        border-top: 1px solid #21262d;
    }
          
    .markdown-body table {
        border-spacing: 0;
        border-collapse: collapse;
        display: block;
        width: max-content;
        max-width: 100%;
        overflow: auto;
    }
          
    .markdown-body p,
    .markdown-body table {
        margin-top: 0;
        margin-bottom: 16px;
    }
   
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
<article class="markdown-body">

${markdownReport}

</article>
`
}

module.exports = getHTMLReport
