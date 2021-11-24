{
  "name": "bank", // Nome do projeto
  "version": "1.0.0", // versão
  "description": "Para aprender o uso de Typescript", // descrição do projeto
  "main": "index.html",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "lite-server --baseDir=dist", // Hot refresh quando tem alteração na pasta dist
    "start": "concurrently \"npm run watch\" \"npm run server\"", // uso do concurrently para mais de um comando
    "compile": "tsc", // compilador do typescript para javascrip
    "watch": "tsc -w" // a diretriz -w executa o comando a cada alteração de arquivos
  },
  "author": "Victor Charles",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^6.0.0", // dependencia que permite rodar 2 comandos ao mesmo tempo
    "lite-server": "^2.6.1", // Pra dar hot refresh
    "typescript": "^4.2.2" // O proprio "typescript"
  }
}
