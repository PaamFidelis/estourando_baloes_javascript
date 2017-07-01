var stop_time = null;
var tempo = 0;
var qtd_baloes = 64;
var estourados = 0;
var limite = 0;

function nivelDoJogo(){
	
	var nivel_jogo = document.getElementById('nivel_jogo').value;

	window.location.href = 'jogo.html?'+nivel_jogo;				
}

function iniciarJogo(){
	
	var url = window.location.search;
	var nivel_jogo = url.replace("?", "");
	
	if(nivel_jogo == 1){
		tempo = 120;
	}
	
	if(nivel_jogo == 2){
		tempo = 60;
	}
	
	if(nivel_jogo == 3){
		tempo = 30;
	}
	
	criar_baloes(qtd_baloes);

	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	
	document.getElementById('baloes_estourados').innerHTML = estourados;
	
	cronometrar(tempo + 1);
}

function criar_baloes(qtd_baloes){
	
	for(var i = 0; i < qtd_baloes; i++ ){
		var baloes = document.createElement("img");
	
		baloes.src = 'imagens/balao_azul_pequeno.png';
		
		baloes.style.margin = '2px';
		baloes.id = i;
		baloes.onclick = function(){ estourar(this); }
	
		document.getElementById("cenario").appendChild(baloes);
	}	
}

function cronometrar(tempo){
	
	tempo = tempo - 1;
	limite = tempo;

	if(tempo == -1){
		clearTimeout(stop_time);
		verificaTempo();
		return false;
	}

	document.getElementById('cronometro').innerHTML = tempo;

	stop_time = setTimeout("cronometrar("+tempo+")", 1000);	
}

function estourar(id_balao){
	
	if(limite == -1){
		verificaTempo();	
	}else{
		var id_balao = id_balao.id;

		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

		document.getElementById(id_balao).setAttribute("onclick", "");

		pontuacao(-1);
	}
}	

function pontuacao(valor){

	qtd_baloes = qtd_baloes + valor;
	estourados = estourados - valor;

	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	
	document.getElementById('baloes_estourados').innerHTML = estourados;

	situacao(qtd_baloes);
}

function situacao(qtd_baloes){
	if(qtd_baloes == 0){
		clearTimeout(stop_time);	
		alert("Parabéns vc ganhou!");
	}
}

function verificaTempo(){
	if(limite == -1){
		alert('Fim de Jogo');
	}
}