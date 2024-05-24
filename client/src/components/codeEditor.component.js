import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';
import '../css/code.css';


const CodeEditor = () => {
    const socket = useSocket();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isClose, setIsClose] = useState(true);
   const [activeEditor, setActiveEditor] = useState(null);
   const [isDivVisible, setIsDivVisible] = useState(true);
   const [isVisibleHtml, setIsVisibleHtml] = useState(true);
   const [isVisibleCssite, setIsVisibleCssite] = useState(true);
   const [isVisibleJss, setIsVisibleJss] = useState(true);

   const handleEditorClick = (Editor) => {
    setActiveEditor(Editor === activeEditor ? null : Editor);
  };


  const handleCloseHtml = () => {
    setIsVisibleHtml(false);
  };

  const handleCloseCssite = () => {
    setIsVisibleCssite(false);
  };

  const handleCloseJss = () => {
    setIsVisibleJss(false);
  };
   
  const handleToggleHtml = () => {
    setIsVisibleHtml(prev => !prev);
  };


  const toggleHtmlEditor = () => {
    setIsVisibleHtml(prev => !prev);
  };

  const toggleCssiteEditor = () => {
    setIsVisibleCssite(prev => !prev);
  };

  const toggleJssEditor = () => {
    setIsVisibleJss(prev => !prev);
  }




   const Navbar = ({ htmlEditorVisible, cssiteEditorVisible, toggleHtmlEditor, toggleCssiteEditor ,toggleJssEditor,jssEditorVisible}) => {
    return (
      <nav className='navs'>
        <button onClick={toggleHtmlEditor} className='togglebutton'>
          {htmlEditorVisible ? 'Close HTML Editor' : 'Open HTML Editor'}
        </button>
        <button onClick={toggleCssiteEditor} className='togglebutton'>
          {cssiteEditorVisible ? 'Close CSS' : 'Open CSS'}
        </button>
        <button onClick={toggleJssEditor} className='togglebutton'>
          {jssEditorVisible ? 'Close JS ' : 'Open JS '}
        </button>
      </nav>
    );
  };


    const runCode = () => {
        const iframe = document.getElementById('iframe').contentWindow.document;
        iframe.open();
        iframe.write(`${html}<style>${css}</style><script>${js}</script>`);
        iframe.close();
    };

    const { roomId } = useParams();

    const changeHTML = (value) => {
        setHtml(value);
        socket.emit('html', value, roomId);
    };

    const changeCSS = (value) => {
        setCss(value);
        socket.emit('css', value, roomId);
    };

    const changeJS = (value) => {
        setJs(value);
        socket.emit('js', value, roomId);
    };

    useEffect(() => {
        socket.emit('join', roomId, html, css, js);
        socket.on('html', (data) => {
            setHtml(data);
            console.log(data);
        });
        socket.on('css', (data) => {
            setCss(data);
            console.log(data);
        });
        socket.on('js', (data) => {
            setJs(data);
            console.log(data);
        });
    }, []);

    return (
        <>
        <div className="t-container">

        <nav className="navbar">
          <ul className="navbar-nav">
            <div className="nav-item">
                <Navbar
                htmlEditorVisible={isVisibleHtml}
                cssiteEditorVisible={isVisibleCssite}
                jssEditorVisible={isVisibleJss}
                toggleHtmlEditor={toggleHtmlEditor}
                toggleCssiteEditor={toggleCssiteEditor}
                toggleJssEditor={toggleJssEditor}
              />
            </div>

            
            <li className="nav-item">
              
            </li>
          </ul>
        </nav>
      </div>
        <div className="scrollable-component">
            <div className="editor-container">
            {isVisibleHtml && (
            <div>
            <div className='header'>HTML</div>
                <Editor
                    height="40vh"
                    defaultLanguage="html"scrollable-component
                    // defaultValue={html}
                    value={html}
                    onChange={(value) => changeHTML(value)}
                    options={{
                        wordWrap: 'on',
                        minimap: { enabled: false },
                        showUnused: false,
                        folding: false,
                        lineNumbersMinChars: 3,
                        fontSize: 16,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        theme:"deepBlue"
                    }}
                />
                </div>
            )}

            {isVisibleCssite && (
               <div>
                <div className='header'>CSS</div>
                <Editor
                    height="40vh"
                    defaultLanguage="css"
                    // defaultValue={css}
                    value={css}
                    onChange={(value) => changeCSS(value)}
                    options={{
                        wordWrap: 'on',
                        minimap: { enabled: false },
                        showUnused: false,
                        folding: false,
                        lineNumbersMinChars: 3,
                        fontSize: 16,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        
                    }}
                />
                </div>
            )}

                {isVisibleJss && ( 
               <div>
                <div className='header'>JS</div>
                <Editor
                    height="40vh"
                    defaultLanguage="javascript"
                    // defaultValue={js}
                    value={js}
                    onChange={(value) => changeJS(value)}
                    options={{
                        wordWrap: 'on',
                        minimap: { enabled: false },
                        showUnused: false,
                        folding: false,
                        lineNumbersMinChars: 3,
                        fontSize: 16,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        
                    }}
                />
                </div>
                )}
            </div>
            <button className="run-btn" onClick={runCode}>Run</button>
            <iframe id="iframe" title="result" style={{ width: '100%', height: '90vh' }} />
        </div>
        </>
    );
};

export default CodeEditor;