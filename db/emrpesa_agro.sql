drop database if exists agro;
create database if not exists agro;
use agro;
create table if not exists empresa(CodeEmpresa varchar(50) primary key not null comment 'ruc dni empresa',nombre varchar(250) not null,
                                   direc varchar(250),logo longtext,telefono1 varchar(50),
                                   telefono2 varchar(50), email varchar(50));
create table if not exists sucursales(Code_Sucursal int primary key auto_increment not null,FK_CodeEmpresa varchar(50) not null,
                                      NombreSucursal varchar(250) not null,DirSucursal longtext,
                                      TelefonoSucursal varchar(50));
alter table sucursales add constraint rel_empresa_sucursales foreign key sucursales(FK_CodeEmpresa) references empresa(CodeEmpresa)
                       on update cascade on delete cascade;
create table if not exists empleados(CodigoEmpleado varchar(50) primary key comment 'DNI RUC',
                        NombresApellidosEmpleado varchar(250) not null ,DirEmpleado varchar(250),
                        TelefonoEmpleado varchar(50),EmailEmpleado varchar(50) not null ,
                        FotoEmpleado longtext,FechaCreacionEmpleado datetime default now(),
                        EstadoEmpleado smallint(2) default 1 comment '0 inactivo 1 activo');
create table if not exists estado_empleados(IdEstado int primary key auto_increment,DetalleEstado varchar(250) not null);
create table if not exists empleado_sucursal(CodeEmpleadoSucursales int primary key auto_increment,
                                 FK_CodigoEmpleado varchar(50) not null,
                                 FK_CodigoSucursal int not null,
                                 FK_EstadoEmpleado int not null,
                                 FechaModificacion datetime default now());
alter table  empleado_sucursal add constraint rel_empleado_sucursal_codigo_empleado
      foreign key empleado_sucursal(FK_CodigoEmpleado) references empleados(CodigoEmpleado);
alter table empleado_sucursal add constraint rel_empleado_sucursal_codigo_sucursal
      foreign key empleado_sucursal(FK_CodigoSucursal) references sucursales(Code_Sucursal);
alter table empleado_sucursal add constraint rel_empleado_sucursal_estado_empleado
      foreign key empleado_sucursal(FK_EstadoEmpleado) references estado_empleados(IdEstado);
create table asistencia_empleado(CodeAsistencia int primary key auto_increment,FK_CodigoEmpleado varchar(50) not null,
                                 FK_Code_Sucursal int not null,FechaAsistencia datetime default now(),
                                 FaltaAsistencia int default 0 comment 'Minutos de atrasos o adelanto');
alter table asistencia_empleado add constraint rel_asistencia_empleado_empleado foreign key asistencia_empleado(FK_CodigoEmpleado)
                                references empleados(CodigoEmpleado);
alter table asistencia_empleado add constraint rel_asistencia_empleado_sucursal foreign key asistencia_empleado(FK_Code_Sucursal)
                                references sucursales(Code_Sucursal);
create table if not exists proveedor(CodigoProveedor varchar(50) primary key comment 'DNI RUC',
                        NombresApellidosProveedor varchar(250) not null ,DirProveedor varchar(250),
                        TelefonoProveedor varchar(50),EmailProveedor varchar(50) not null ,
                        FechaCreacionProveedor datetime default now(),
                        CuentaBancaria varchar(250),
                        EstadoProveedor smallint(2) default 1 comment '0 inactivo 1 activo');
create table if not exists empresa_proveedor(CodeEmpresaProveedor int primary key,FK_CodeEmpresa varchar(50) not null,
                                             FK_CodeProveedor varchar(50) not null);
alter table empresa_proveedor add constraint rel_empresa_proveedor_proveedor foreign key empresa_proveedor(FK_CodeProveedor)
                              references proveedor(CodigoProveedor);
alter table empresa_proveedor add constraint rel_empresa_proveedor_empresa foreign key empresa_proveedor(FK_CodeEmpresa)
                              references empresa(CodeEmpresa);
create table usuario_admin(CodigoUsuarioAdmin varchar(50) not null,
                           FK_CodeEmpresa varchar(50) not null,
                           ContraseniaUsuarioAdmin varchar(100) not null ,
                           NombreApellidosAdmin varchar(250) not null,
                           EstadoUsuarioAdmin smallint(2) default 1 comment '0 inactivo 1 activo',
                           primary key (CodigoUsuarioAdmin,FK_CodeEmpresa));
create table usuario_admin_sucursal(CodeUserAdminSucursal int primary key auto_increment,
                                    FK_CodigoUsuarioAdmin varchar(50) not null,
                                    FK_Code_Sucursal int not null,
                                    FechaAsignacion datetime default now());
alter table usuario_admin_sucursal add constraint rel_usuario_admin_sucursal_usuario_admin foreign key usuario_admin_sucursal(FK_CodigoUsuarioAdmin)
                                   references usuario_admin(CodigoUsuarioAdmin);
alter table usuario_admin_sucursal add constraint rel_usuario_admin_sucursal_sucursal foreign key usuario_admin_sucursal(FK_Code_Sucursal)
                                   references sucursales(Code_Sucursal);

create table if not exists cliente(CodeCliente varchar(50) primary key not null,
                     FK_CodeEmpresa varchar(50) not null, NombreApellidosCliente varchar(250) not null,
                     TelefonoCliente varchar(50),EmailCliente varchar(50) not null,
                     DireccionCliente varchar(250) not null);
alter table cliente add constraint rel_cliente_empresa foreign key cliente(FK_CodeEmpresa) references empresa(CodeEmpresa);

/*** DE AQUI NINGUNA SENTENCIA SE EJECUTO **/
/**GASTO FALTA RELACIONAR CON SUCURSAL**/
create table if not exists gastos(CodeGasto int auto_increment primary key,NombreGasto varchar(250) not null,
                                  FK_CodigoProveedor varchar(50) not null,cantidad decimal(10,2) default 0.00,
                                  CodigoFactura varchar(50) not null,NotaFactura longtext,
                                  FK_CodigoEmpleado varchar(50) not null,FotoFactura longtext,
                                  FK_CodigoUsuarioAdmin varchar(50) not null);
alter table gastos add constraint rel_gatos_empleado foreign key gastos(FK_CodigoEmpleado) references empleados(CodigoEmpleado);
alter table gastos add constraint rel_gatos_usuario_admin foreign key gastos(FK_CodigoUsuarioAdmin) references usuario_admin(CodigoUsuarioAdmin);
alter table gastos add constraint rel_gatos_proveedor foreign key gastos(FK_CodigoProveedor) references proveedor(CodigoProveedor);

create table if not exists ingresos(CodigoIngreso int primary key auto_increment,FechaCreacionIngreso datetime default now(),
                      FechaIngresoIngreso datetime comment 'cuando se registro dicho ingreso',NombreIngreso varchar(250) not null,
                      FK_Code_Sucursal int not null,
                      FK_CodeCliente varchar(50) not null,CantidadIngreso decimal(10,2) default 0.00,
                      NotaIngreso longtext,FotoIngreso longtext,EstadoIngreso smallint(2) default 1) comment '0 eliminado 1 activo';
alter table ingresos add constraint rel_ingresos_cliente foreign key ingresos(FK_CodeCliente) references cliente(CodeCliente);
alter table ingresos add constraint rel_ingresos_sucursal foreign key ingresos(FK_Code_Sucursal) references sucursales(Code_Sucursal);




/**REVISAR LA TABLA VEHICULO**/
create table tipo_gasto(CodeTipoGasto int primary key auto_increment,DetalleTipoGasto varchar(250) not null);
create table vehiculo(PlacaVehiculo varchar(50) not null primary key,DetalleVehiculo varchar(250),FotoVehiculo longtext,
                      KmInicial decimal(10,2) default 0.00,KmMantenimiento decimal(10,2) default 0.00);
/*****************************************************************/

create table gastos_vehicular(CodeGastoVehicular int primary key auto_increment,
                              FK_PlacaVehicular varchar(50) not null,
                              ValorGastoVehicular decimal(10,2) default 0.00,
                              FechaCreacionGasto datetime default now(),
                              FechaRegistroGasto datetime comment 'esta fecha se guarda cuando se envia la fecha de registro de la factura',
                              NumeroTicketGastoVehicular varchar(250) not null,
                              FotoTicketGastoVehicular longtext,
                              FK_CodeTipoGasto int not null);

alter table gastos_vehicular add constraint rel_gasto_vehicular_vehiculo foreign key gastos_vehicular(FK_PlacaVehicular)
                             references vehiculo(PlacaVehiculo);

alter table gastos_vehicular add constraint rel_gasto_vehicular_tipo_gasto foreign key gastos_vehicular(FK_CodeTipoGasto)
                             references tipo_gasto(CodeTipoGasto);

/*************************************************************************************************************************/

/***** SELECT ***/

select AUS.FK_Code_Sucursal,S.NombreSucursal from usuario_admin as UA
       left join usuario_admin_sucursal as AUS on  UA.CodigoUsuarioAdmin = AUS.FK_CodigoUsuarioAdmin
       left join sucursales as S on AUS.FK_Code_Sucursal = S.Code_Sucursal
       where UA.CodigoUsuarioAdmin = 'admin01@gmail.com' and UA.FK_CodeEmpresa = '0604666982001';


/**INSERT  Q SE DEBEN LLENAR POR DEFECTO**/
insert into empresa(CodeEmpresa, nombre, direc, logo, telefono1, telefono2, email)
            values ('0604666982001','VIRTUALCODE7 S.A.S','','','0993706012','','virtualcode7ecuador@gmail.com');
insert into usuario_admin(CodigoUsuarioAdmin, FK_CodeEmpresa, ContraseniaUsuarioAdmin, NombreApellidosAdmin)
            VALUES ('admin01@gmail.com','0604666982001','12345678','Nelson Patricio Yunga Guaman');
insert into sucursales(FK_CodeEmpresa, NombreSucursal, DirSucursal, TelefonoSucursal)
             VALUES ('0604666982001','Sucursal 001','Guadalajara - Mexico','1111111111');
insert into sucursales( FK_CodeEmpresa, NombreSucursal, DirSucursal, TelefonoSucursal)
             VALUES ('0604666982001','Sucursal 002','Guadalajara - Mexico','1111111111');
insert into sucursales(FK_CodeEmpresa, NombreSucursal, DirSucursal, TelefonoSucursal)
             VALUES ('0604666982001','Sucursal 003','Guadalajara - Mexico','1111111111');
insert into sucursales(FK_CodeEmpresa, NombreSucursal, DirSucursal, TelefonoSucursal)
             VALUES ('0604666982001','Sucursal 004','Guadalajara - Mexico','1111111111');
insert into usuario_admin_sucursal(FK_CodigoUsuarioAdmin, FK_Code_Sucursal,
                                   FechaAsignacion) VALUES ('admin01@gmail.com',1,now());
insert into usuario_admin_sucursal(FK_CodigoUsuarioAdmin, FK_Code_Sucursal,
                                   FechaAsignacion) VALUES ('admin01@gmail.com',2,now());
insert into usuario_admin_sucursal(FK_CodigoUsuarioAdmin, FK_Code_Sucursal,
                                   FechaAsignacion) VALUES ('admin01@gmail.com',3,now());
insert into usuario_admin_sucursal(FK_CodigoUsuarioAdmin, FK_Code_Sucursal,
                                   FechaAsignacion) VALUES ('admin01@gmail.com',4,now());

-- procedimientos para por defecto

create procedure registerSucursalUserAdmin(in empleado_code_ varchar(50),in empresa_ varchar(50),in nombre_ varchar(50),
                  in direccion_ varchar(50),in telefono_ varchar(50))
begin

    declare idSucursal int default 0;

    DECLARE exit handler for sqlexception
      BEGIN
        -- ERROR
        rollback;
        select 400 as status_code;
      END;

    DECLARE exit handler for sqlwarning
      BEGIN
        -- WARNING
        rollback;
        select 400 as status_code;
      END;



    START TRANSACTION;
    insert into sucursales(FK_CodeEmpresa, NombreSucursal, DirSucursal, TelefonoSucursal)
                VALUES (empresa_,nombre_,direccion_,telefono_);
    set idSucursal = last_insert_id();
    insert into usuario_admin_sucursal(FK_CodigoUsuarioAdmin, FK_Code_Sucursal, FechaAsignacion)
                VALUES (empleado_code_,idSucursal,now());
    select 200 as status_code;
    COMMIT;
end;

call registerSucursalUserAdmin('admin01@gmail.com','0604666982001','SUCURSAL 100','','');

