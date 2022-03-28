export class Empleado {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    this.id = "";
    this.grabar = true;
    this.url = "http://localhost:3000/empleados";
  }
  async obtenerEmpleados() {
    fetch(this.url)
      .then((res) => res.json())
      .then((empleados) => {
        let filas = "";
        empleados.forEach((empleado) => {
          // destructuring: descomponer un objeto en sus atributos
          let { id, nombre, cedula, descripcion, descripcion_depa, sueldo, estado } = empleado;
          
          // cargoID = empleados.cargos.filter(
          //   (x) => x.id === cargoID
          // );
          // departamentoID = empleados.departamentos.filter(
          //   (x) => x.id === departamentoID
          // );
          filas += ` <tr>
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${cedula}</td>
        <td>${descripcion}</td>
        <td>${descripcion_depa}</td>
        <td>${sueldo}</td>
        <td>${estado ? "Activo" : "Inactivo"}</td>
        <td>
          <button type="button" class="btn btn-edit" id="btn-edit" data-id="${id}">✏️</button>
          <button type="button" class="btn btn-delete" id="btn-delete" data-id="${id}">❌</button>
        </td>
      </tr>
       `;
        });
        //console.log(filas);
        document.getElementById("detalle-empleados").innerHTML = filas;
        // eliminar
        const btnsDelete = document.querySelectorAll(".btn-delete");
        //console.log(btnsDelete);
        btnsDelete.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(btn.dataset.id, e.target.dataset.id);
            console.log("elimnando...");
            await this.eliminarEmpleado(e.target.dataset.id);
          });
        });
        // editar
        const $btnsEdit = document.querySelectorAll(".btn-edit");
        $btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(e.target.dataset.id);
            this.id = e.target.dataset.id;
            let { id, nombre, cedula, cargoID, departamentoID, sueldo, estado } = await this.obtenerEmpleado(this.id);
            document.getElementById("nombre").value = nombre;
            document.getElementById("cedula").value = cedula;
            document.getElementById("cargo").value = cargoID;
            document.getElementById("departamento").value = departamentoID;
            document.getElementById("sueldo").value = sueldo;
            document.getElementById("activo").checked = estado;
            document.getElementById("enviar").innerHTML = "Actualizar";
            this.grabar = false;
          });
        });
        //comboCargo

/*         var forCombo="";
        var cont = 0;
        empleados.cargos.forEach((cargo) => {
          // destructuring: descomponer un objeto en sus atributos
          let { id, descripcion, estado } = cargo;
          cont += 1;
          forCombo += `
          <option value="${id}">Cargo ${cont}</option>
       `;
        });
        //console.log(filas);
        document.getElementById("cargo").innerHTML = forCombo;
        forCombo="";
        cont = 0;
        empleados.departamentos.forEach((departamento) => {
          // destructuring: descomponer un objeto en sus atributos
          let { id, descripcion, estado } = departamento;
          cont += 1;
          forCombo += `
          <option value="${id}">Departamento ${cont}</option>
       `;
        });
        //console.log(filas);
        document.getElementById("departamento").innerHTML = forCombo; */
      })
      .catch((err) => console.log("error:=>", err));
  }

  async obtenerEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`);
    const dato = await res.json();
    console.log(dato[0]);
    return dato[0];
  }

  async eliminarEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`, { method: "delete" });
    this.obtenerEmpleados();
  }
  // insertar un nuevo empleado
  async insertarDatos(empleado) {
    const res = await fetch(this.url, { method: "post", body: empleado });
    this.obtenerEmpleados();
    return true;
  }

  async modificarDatos(empleadoMod, id) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "put",
        body: empleadoMod,
      });
      this.obtenerEmpleados();
      document.getElementById("enviar").innerHTML = "Insertar";
      this.grabar = true;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // fin de la clase empleado
}
