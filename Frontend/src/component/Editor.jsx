import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/3042-day';
import 'codemirror/theme/blackboard.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
 
const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef = useRef(null);
  useEffect(() => {
      async function init() {
        editorRef.current = Codemirror.fromTextArea(
            document.getElementById('realtimeEditor'),
            { 
                mode: { name: 'javascript', json: true },
                theme: 'blackboard',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            }
        );

        editorRef.current.on('change',(instance,changes)=>{
          // console.log('changes',instance,changes);
          const {origin} = changes;
          const code = instance.getValue();
          
          onCodeChange(code); // update the changed code 

          if(origin !== 'setValue'){
            socketRef.current.emit('code-change', { // socketRef is from roomPage
                roomId,
                code,
            }); 
          }
        });
        
        socketRef.current.on('code-change',({code}) => {
          if(code !== null){
            editorRef.current.setValue(code);
          }
        })

      };
      init();
  }, []);

  useEffect(() => {
    if(socketRef.current){
      socketRef.current.on('code-change',({code})=>{
        if(code !== null){
          editorRef.current.setValue(code);
        }
      })
    }

    return () => {
      socketRef.current.off('code-change');
    };
  },[socketRef.current])


  return (
    <div className='w-full h-screen'>
      <style>{`.CodeMirror{height:100% !important;}
              `}</style>
      
      <textarea
        id="realtimeEditor"
        className="w-full min-h-screen max-h-[80vh] resize-y rounded-2xl border border-white/5 bg-gradient-to-b from-[#0f1720] to-[#0b1220] text-slate-200 font-mono text-sm leading-6 p-5 outline-none shadow-lg caret-[#58a6ff] placeholder:italic placeholder:text-slate-400/40 overflow-auto focus:ring-4 focus:ring-[#58a6ff]/10 focus:border-[#58a6ff]/20"
        value='// start coding here.....'
      />
    </div>
  )
}

export default Editor