var stop_time = null;
var tempo = 0;
var qtd_baloes = 64;
var estourados = 0;

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

function cronometrar(segundos){
	
	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(stop_time);
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	stop_time = setTimeout("cronometrar("+segundos+")", 1000);	
}

function estourar(id_balao){
	
	var id_balao = id_balao.id;

	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	document.getElementById(id_balao).setAttribute("onclick", "");

	pontuacao(-1);

	id_balao.onclick("");
}	

function pontuacao(valor){

	qtd_baloes = qtd_baloes - 1;
	estourados = estourados + 1;

	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	
	document.getElementById('baloes_estourados').innerHTML = estourados;
}