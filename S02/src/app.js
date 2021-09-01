import express from 'express';
import dayjs from 'dayjs';

const app = express();

app.get('/premiere', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Notre première route avec express');
});

//maths/produit
//maths/difference
//maths/quotient
//maths/reste
//maths/somme
app.get('/maths/:operation', (req, res) => {

    const operation = req.params.operation;
    //console.log(operation);

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    let result = 0;
    switch(operation) {
        case 'somme':
            result = a + b;
            break;
        case 'difference':
            result = a - b;
            break;
        case 'produit':
            result = a * b;
            break;
        case 'quotient':
            result = a / b;
            break;
        case 'reste':
            result = a % b;
            break;
        default:
            //console.log('Opération non reconnue');
            return res.status(400).end();

    }

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`<b>${result}</b>`);
});


app.get('/date', (req, res) => {
    //Status et Content-Type
    res.status(200).set('Content-Type','text/plain');
    //Envoyer une réponse
    const now = dayjs().format('YYYY-MM-DD HH:mm');
    res.send(now);    
});

export default app;