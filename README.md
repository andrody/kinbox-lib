# kinbox-lib SDK

[Site](https://www.kinbox.com.br/) |
[Docs](https://kinbox.notion.site/Ajuda-Documenta-o-Kinbox-ca104688a4ed40da894803ec03363ae1)

## Installation

In a browser:
```html
<script src="https://andrody.github.io/kinbox-lib/kinboxjs.js"></script>
```

## Eventos

No navegador coloque o script:
```javascript
// Dados da conversa
Kinbox.on("conversation", function (data) {

})

// Callback de retorno
Kinbox.on("callback", function (data) {
    
})
```

Exemplo do payload da conversa obtida no evento "conversation"
```json
{
    "contact": {
        "id": "744",
        "customFields": {
            "cpf": {
                "type": "text",
                "value": null
            },
            "idade": {
                "type": "text",
                "value": "62"
            }
        },
        "name": "Romerio",
        "avatar": "https://pps.whatsapp.net/v/t61.24694-24/85538138_656191448516145_3988189912225985384_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVwdN5_veazn3xKmC7dIlUPNHimgVQpetjc_N_7tj79VUw&oe=6313E547",
        "email": null,
        "phone": "558599253056"
    },
    "conversation": {
        "id": "740",
        "identifier": "558599253056@c.us",
        "assignee": {
            "id": "1"
        },
        "group": {
            "id": null
        },
        "channel_type": "whatsapp",
        "link": "https://app.kinbox.com.br/inbox/all/740",
        "tags": []
    },
    "user": {
        "id": "2",
        "name": "Andrew Feitosa",
        "phone": "85972818387",
        "avatar": "7e3832b0-dda4-11ec-bd38-71b0cf6548e9.jfif",
        "email": "andrewcsz@gmail.com",
        "isActive": true
    },
    "dev": false
}
```
