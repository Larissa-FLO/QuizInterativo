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
        if (nivel === "facil") {
           document.querySelector('.container').style.background =  "radial-gradient(circle at 43.84% 120.44%, #859533 0, #769333 12.5%, #608e2f 25%, #438327 37.5%, #12751c 50%, #006614 62.5%, #005b14 75%, #00541a 87.5%, #005123 100%)"
        } else if (nivel === "medio") {
            document.querySelector('.container').style.background = "radial-gradient(circle at 25.82% 116.45%, #ffff8e 0, #ffff5d 25%, #eaea10 50%, #b5c700 75%, #83aa00 100%)"
            document.querySelector('.pergunta').style.color = "black"
        } else {
            document.querySelector('.container').style.background = "radial-gradient(circle at 38.64% 114.41%, #ee6e00 0, #e75b00 16.67%, #db470a 33.33%, #cc3016 50%, #bb151c 66.67%, #ac0020 83.33%, #9d0024 100%)"
            document.querySelector('.pergunta').style.color = "white"
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
        {questions[perguntaAtual].link && (
            <div className='imagem'>
                <img src={questions[perguntaAtual].link} alt="imagem da pergunta"></img>
            </div>
        )}        
        </div>
        <div className='pergunta-resposta'>
        <div className='pergunta'>{questions[perguntaAtual].pergunta}</div>
        <div className='resposta'>
            {questions[perguntaAtual].opcoesResposta.map((opcoesResposta) =>
            <div className='grupoReposta'>
                <button onClick={() => proximaPergunta(opcoesResposta.correta)}>{opcoesResposta.resposta}</button>
            </div>)}
            
        </div>
        </div>
    </>
    )}
   </div>    
  );
}