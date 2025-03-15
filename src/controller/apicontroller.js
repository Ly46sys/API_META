const enviarmensaje = require("../service/apiapiservice");
const verificar = (req, res) => {

    try{
        var tokenbod = "leviapp";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == tokenbod){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(e){
        res.status(400).send();
    }

}

const recibir = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var objetoMensaje = value["messages"];

        var tipo = objetoMensaje[0]["type"];

        if(tipo=="interactive"){
            var tipointeractivo= objetoMensaje[0]["interactive"]["type"];

            if(tipointeractivo=="button_reply"){
                var texto = objetoMensaje[0]["interactive"]["button_reply"]["id"];
                var number = objetoMensaje[0]["from"];

                enviarmensaje.EnviarMensajeWhastpapp(texto, number);
            }else if(tipointeractivo=="list_reply"){
                var texto = objetoMensaje[0]["interactive"]["list_reply"]["id"];
                var number = objetoMensaje[0]["from"];
                
                console.log(texto);
            }

        }

        if (typeof objetoMensaje != "undefined"){
            var messages = objetoMensaje[0];
            var texto = messages["text"]["body"];
            var number = messages["from"];

            enviarmensaje.EnviarMensajeWhastpapp(texto, number);

        }

        res.send("EVENT_RECEIVED");

    }catch(e){

        /* console.log(e); */
        res.send("EVENT_RECEIVED");

    }
}

module.exports = {
    verificar,
    recibir
}
