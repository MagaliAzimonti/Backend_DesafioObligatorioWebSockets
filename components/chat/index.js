const fs = require("fs");

class ChatContenedor {
  constructor(nonbreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async writeFile(datos) {
    await this.getAll();
    try {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(datos, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error, "No hay datos en el archivo");
      return [];
    }
  }

  async save(msg) {
    try {
      let fecha = new Date();
      let chat = await thi.getAll();
      msg.fecha = fecha.toLocaleString();
      chat.push(msg);
      console.log(msg);
      await this.writeFile(chat);
    } catch (error) {
      console.log(error, "No se ha logrado guardar el archivo");
    }
  }
}

module.exports = ChatContenedor;
