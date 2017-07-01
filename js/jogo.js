var stop_time = null;
var tempo = 0;
var qtd_baloes = 64;
var estourados = 0;
var limite = 0;


/* -- Envia o nível do jogo para a página principal -- */
function nivel_do_jogo(){
	
	/* Pega o valor no nível selecionado pelo usuário */
	var nivel_jogo = document.getElementById('nivel_jogo').value;

	/* Manda como parâmetro para a página principal */
	window.location.href = 'jogo.html?'+nivel_jogo;				
}

/* -- Inicia o jogo -- */
function iniciar_jogo(){
	
	/* Pega o parâmetro enviado */
	var url = window.location.search;
	var nivel_jogo = url.replace('?', '');
	
	/* Define o tempo de acordo com o nível do usuário */
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

	/* Contagem dos balões inicialmente */
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;	
	document.getElementById('baloes_estourados').innerHTML = estourados;
	
	cronometrar(tempo + 1);
}

/* -- Criação dos balões -- */
function criar_baloes(qtd_baloes){
	
	for(var i = 0; i < qtd_baloes; i++ ){
		
		/* Cria a "área" de cada balão */
		var baloes = document.createElement('img');
	
		/* Cria o balão e define um espaçamento entre cada */
		baloes.src = 'imagens/balao_azul_pequeno.png';		
		baloes.style.margin = '2px';
		
		/* Define um id para cada balão */
		baloes.id = i;

		/* Evento de clique de cada botão */
		baloes.onclick = function(){ estourar(this); }
		
		/* Cria os balões no "cenário" */
		document.getElementById('cenario').appendChild(baloes);
	}	
}

/* -- Contagem do tempo -- */
function cronometrar(tempo){
	
	tempo = tempo - 1;
	limite = tempo;

	/* Trava para quando o tempo acabar */
	if(tempo == -1){
		clearTimeout(stop_time);
		verificaTempo();
		return false;
	}

	document.getElementById('cronometro').innerHTML = tempo;

	/* Define que o tempo será em segundos */
	stop_time = setTimeout('cronometrar('+tempo+')', 1000);	
}

/* -- Estouro dos balões -- */
function estourar(id_balao){
	
	/* Trava para não deixar estourar os balões depois do tempo */
	if(limite == -1){
		verificaTempo();	
	}else{
		var id_balao = id_balao.id;

		/* Alteração para balão estourado */
		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

		/* Não permite que o usuário clique no balão mais de uma vez */
		document.getElementById(id_balao).setAttribute('onclick', '');

		pontuacao(-1);
	}
}	

/* -- Pontuação do jogo -- */
function pontuacao(valor){

	qtd_baloes = qtd_baloes + valor;
	estourados = estourados - valor;

	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;	
	document.getElementById('baloes_estourados').innerHTML = estourados;

	situacao(qtd_baloes);
}

/* -- Situação do jogo -- */
function situacao(qtd_baloes){
	if(qtd_baloes == 0){
		clearTimeout(stop_time);	
		alert("Parabéns vc ganhou!");
	}
}

/* -- Verifica se o tempo acabou -- */
function verifica_tempo(){
	if(limite == -1){
		alert("Fim de Jogo");
	}
}