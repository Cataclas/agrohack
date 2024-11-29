const roleConfigGestion = {
  usuario: {
    menu: [
      {
        title: 'Productos', key: 'producto',
        subMenu: [
          { title: 'Productos', key: 'productos', crud: true },
          { title: 'Rutas', key: 'rutas', crud: true },
        ],
      },
      {
        title: 'Usuarios',
        key: 'usuarios',
        subMenu: [
          { title: 'Roles', key: 'roles', crud: true },
          { title: 'Permisos', key: 'permisos', crud: true },
          { title: 'Usuarios', key: 'usuariosCrud', crud: true },
        ],
      },
    ],
    data: {
      productos: {
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Producto', dataIndex: 'producto', key: 'producto' },
          { title: 'Precio', dataIndex: 'precio', key: 'precio' },
        ],
        data: [
          { id: 1, producto: 'Producto 1', precio: '$100' },
          { id: 2, producto: 'Producto 2', precio: '$200' },
        ],
      },
      roles: {
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Rol', dataIndex: 'rol', key: 'rol' },
        ],
        data: [
          { id: 1, rol: 'Admin' },
          { id: 2, rol: 'Editor' },
        ],
      },
      permisos: {
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Permiso', dataIndex: 'permiso', key: 'permiso' },
        ],
        data: [
          { id: 1, permiso: 'Ver' },
          { id: 2, permiso: 'Editar' },
        ],
      },
      usuariosCrud: {
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        ],
        data: [
          { id: 1, nombre: 'Usuario 1' },
          { id: 2, nombre: 'Usuario 2' },
        ],
      },
    },
  },
  otro: {
    menu: [
      { title: 'Opción única', key: 'opcionUnica', crud: true },
    ],
    data: {
      opcionUnica: {
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
        ],
        data: [
          { id: 1, descripcion: 'Descripción 1' },
          { id: 2, descripcion: 'Descripción 2' },
        ],
      },
    },
  },
};

export default roleConfigGestion;
