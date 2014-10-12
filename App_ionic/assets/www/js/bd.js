		function salvar() {
            db.transaction(geraOsDB, errorCB, successCB);
            }
        function geraOsDB(tx) {
        
            var numer = document.getElementById('numero').value;
            var client = document.getElementById('cliente').value;
            var descrica = document.getElementById('descricao').value;
            var fot = document.getElementById('urlFoto').value;
            
           
            tx.executeSql('CREATE TABLE IF NOT EXISTS OS (id INTEGER PRIMARY KEY, numero, cliente, descricao, foto, status)');
           
            tx.executeSql('INSERT INTO OS (numero, cliente, descricao, foto, status) VALUES ("'+numer+'", "'+client+'", "'+descrica+'" , "'+fot+'", "bancada")');
        }
        
               
        function exclui(id) {
   
   		 db.transaction(function(tx) {tx.executeSql('DELETE FROM OS WHERE id="'+id+'"')}, errorCB, successCB);
   		 
		}
        
        function ver() {
            db.transaction(queryDB, errorCB);
        }
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM OS', [], querySuccess, errorCB);
        }
 
        function querySuccess(tx, results) {
            var len = results.rows.length;

            for (var i=0; i<len; i++){

                document.getElementById('ListaBancada').innerHTML += '<a class="item item-thumbnail-left" href="#/event/single?id='+ results.rows.item(i).id +'&tipo=bancada"><img src="'+ results.rows.item(i).foto +'"/><h2>'+results.rows.item(i).numero+'</h2><p>'+results.rows.item(i).descricao+'</p></a>';
              
            }
        }
        //listas
         function lista(tipo) {
    var sqlTxt = "SELECT * FROM OS WHERE status=?"
    db.transaction(function(tx) {tx.executeSql(sqlTxt,[tipo], queryListas)}, errorCB);
		}
 
        function queryListas(tx, results) {
            var len = results.rows.length;

            for (var i=0; i<len; i++){

                document.getElementById('ListaItens').innerHTML += '<a class="item item-thumbnail-left" href="#/event/single?id='+ results.rows.item(i).id +'&tipo=bancada"><img src="'+ results.rows.item(i).foto +'"/><h2>'+results.rows.item(i).numero+'</h2><p>'+results.rows.item(i).descricao+'</p></a>';
              
            }
        }
        //fim listas
        
        function singleDB(id) {
    var sqlTxt = "SELECT * FROM OS WHERE id=?"
    db.transaction(function(tx) {tx.executeSql(sqlTxt,[id], querySuccessSingle)}, errorCB);
		}
       
 
        function querySuccessSingle(tx, results) {
            var len = results.rows.length;

            for (var i=0; i<len; i++){
				 document.getElementById('numeroOs').innerHTML = results.rows.item(i).numero;
				 document.getElementById('imgSinlge').src = results.rows.item(i).foto;
				 document.getElementById('descSingle').innerHTML = results.rows.item(i).descricao;
				 document.getElementById('clientSingle').innerHTML = '<i class="icon ion-person" style="font-size:30px" ></i> '+results.rows.item(i).cliente;
              	 document.getElementById('statusSingle').innerHTML = results.rows.item(i).status;
              	 document.getElementById('excluiSingle').onclick = 'exclui('+results.rows.item(i).id+')';
            }
        }
        
        function errorCB(err) {
            alert("erro!");
        }
        function successCB() {
            alert("Executado com sucesso!");
        }
