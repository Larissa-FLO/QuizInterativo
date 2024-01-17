import React, { useEffect, useState } from 'react'
import './style.css'
import { Perguntas } from '../data/perguntas'


export default function Quizz() {
    const questions = Perguntas ?? []
    const[perguntaAtual, setPerguntaAtual] = useState(0);
    const[showPontuacao, setShowPontuacao] = useState(false)
    const [pontos, setPontos] = useState(0)
    const [nivel, setNivel] = useState("facil")

    function checkNivel(){
        setNivel(questions[perguntaAtual].nivel)
        console.log(nivel)
        if (nivel == "facil") {
           document.querySelector('.contagemPerguntas').style.background = "green"
        } else if (nivel == "medio") {
            document.querySelector('.contagemPerguntas').style.background = "yellow"
        } else {
            document.querySelector('.contagemPerguntas').style.background = "red"
        }
    }
  
    function proximaPergunta(correta){
        const nextQuestion = perguntaAtual + 1 
        
        if(correta){
            setPontos(pontos + 1)
        }

        if(nextQuestion < questions.length){
            setPerguntaAtual(nextQuestion)
        }else{
            setShowPontuacao(true)
        }

        
    }

  useEffect(() => {
    checkNivel()
  },[perguntaAtual])

    return (
    <div className='container'> 
        {showPontuacao ? (<div className='pontuacao'>
            <span>sua pontuação é {pontos} de {questions.length}</span></div>):(
        <>
        <div className='infoperguntas'>
            <div className='contagemPerguntas'>
                <span>Pergunta {perguntaAtual + 1}/{questions.length}</span>
            </div>
            <div className='pergunta'>{questions[perguntaAtual].pergunta}</div>
        </div>
        <div className='resposta'>
            {questions[perguntaAtual].opcoesResposta.map((opcoesResposta) =>
            <div className='grupoReposta'>
                <span>{opcoesResposta.alternativa}</span>
                <button onClick={() => proximaPergunta(opcoesResposta.correta)}>{opcoesResposta.resposta}</button>
            </div>)}
            
        </div>
    </>
    )}
   </div>    
  );
}