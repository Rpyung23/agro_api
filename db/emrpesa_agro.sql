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
                        FK_CodigoSucursal int not null,
                        EstadoEmpleado smallint(2) default 1 comment '0 inactivo 1 activo');
create table if not exists estado_empleados(IdEstado int primary key auto_increment,DetalleEstado varchar(250) not null);
/*create table if not exists empleado_sucursal(CodeEmpleadoSucursales int primary key auto_increment,
                                 FK_CodigoEmpleado varchar(50) not null,
                                 FK_CodigoSucursal int not null,
                                 FK_EstadoEmpleado int not null,
                                 FechaModificacion datetime default now());
alter table  empleado_sucursal add constraint rel_empleado_sucursal_codigo_empleado
      foreign key empleado_sucursal(FK_CodigoEmpleado) references empleados(CodigoEmpleado);
alter table empleado_sucursal add constraint rel_empleado_sucursal_codigo_sucursal
      foreign key empleado_sucursal(FK_CodigoSucursal) references sucursales(Code_Sucursal);
alter table empleado_sucursal add constraint rel_empleado_sucursal_estado_empleado
      foreign key empleado_sucursal(FK_EstadoEmpleado) references estado_empleados(IdEstado);*/
alter table empleados add constraint rel_empleado_secursal foreign key empleados(FK_CodigoSucursal) references sucursales(Code_Sucursal);
/*create table asistencia_empleado(CodeAsistencia int primary key auto_increment,FK_CodigoEmpleado varchar(50) not null,
                                 FK_Code_Sucursal int not null,FechaAsistencia datetime default now(),
                                 FaltaAsistencia int default 0 comment 'Minutos de atrasos o adelanto');
alter table asistencia_empleado add constraint rel_asistencia_empleado_empleado foreign key asistencia_empleado(FK_CodigoEmpleado)
                                references empleados(CodigoEmpleado);
alter table asistencia_empleado add constraint rel_asistencia_empleado_sucursal foreign key asistencia_empleado(FK_Code_Sucursal)
                                references sucursales(Code_Sucursal);*/
create table if not exists proveedor(CodigoProveedor varchar(50) primary key comment 'DNI RUC',
                        NombresApellidosProveedor varchar(250) not null ,DirProveedor varchar(250),
                        TelefonoProveedor varchar(50),EmailProveedor varchar(50) not null ,
                        FechaCreacionProveedor datetime default now(),
                        CuentaBancaria varchar(250),
                        AtienddeProveedor varchar(250),
                        EstadoProveedor smallint(2) default 1 comment '0 inactivo 1 activo');
alter table proveedor add column TelefonoEmpresa varchar(50);
alter table proveedor add column DomicilioGoogle text;
create table if not exists empresa_proveedor(CodeEmpresaProveedor int primary key auto_increment,FK_CodeEmpresa varchar(50) not null,
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


create table if not exists gastos(CodeGasto int auto_increment primary key,NombreGasto varchar(250) not null,
                                  FK_CodigoProveedor varchar(50) not null,cantidad decimal(10,2) default 0.00,
                                  CodigoFactura varchar(50) not null,NotaFactura longtext,
                                  QRealizo varchar(250) not null,FotoFactura longtext,
                                  DateTimeRegistroGasto datetime default now(),
                                  FK_CodeEmpresa varchar(50) not null,
                                  FK_CodigoUsuarioAdmin varchar(50) not null);

create table if not exists ingresos(CodigoIngreso int primary key auto_increment,FechaCreacionIngreso datetime default now(),
                      NombreIngreso varchar(250) not null,FK_CodigoUsuarioAdmin varchar(50) not null,
                      FK_Code_Sucursal int not null,FK_CodeEmpresa varchar(50) not null,
                      NameCliente varchar(250) not null,CantidadIngreso decimal(10,2) default 0.00,
                      NotaIngreso longtext,FotoIngreso longtext,EstadoIngreso smallint(2) default 1) comment '0 eliminado 1 activo';

create table vehiculo(PlacaVehiculo varchar(50) not null primary key,FK_Empresa varchar(50) not null,
                      Fk_sucursal  int not null ,DetalleVehiculo varchar(250),FotoVehiculo longtext,
                      KmInicial decimal(10,2) default 0.00,KmMantenimiento decimal(10,2) default 0.00);

create table estado_trabajo(idEstadoTrabajo int auto_increment primary key,detalle varchar(250) default '');

create table trabajos(idTrabajo int primary key auto_increment,NameTrabajo varchar(250),Fk_Sucursal int not null ,
                      Fk_Empresa varchar(50) not null,fotoTrabajo text,fechaInicio date,fechaFin date,fechaLimite date,
                      notaTrabajo text,FKEstadoTrabajo int default 1);

alter table trabajos add constraint  rel_trabajo_sucursal foreign key trabajos(Fk_Sucursal) references sucursales(Code_Sucursal);
alter table trabajos add constraint  rel_trabajo_empresa foreign key trabajos(Fk_Empresa) references empresa(CodeEmpresa);
alter table trabajos add constraint  rel_trabajo_estado_trabajo foreign key trabajos(FKEstadoTrabajo) references estado_trabajo(idEstadoTrabajo);

create table notificacion(id_notificacion int primary key auto_increment,
             fecha_creacion datetime default now(),fk_code_sucursal int not null,
             detalle longtext,estado smallint(1) default 1 comment '1->activo,2 -> visto, 0->anulado');


create table gastos_vehicular(CodeGastoVehicular int primary key auto_increment,
                              FK_PlacaVehicular varchar(50) not null,
                              ValorGastoVehicular decimal(10,2) default 0.00,
                              FechaCreacionGasto datetime default now(),
                              FechaProximoServicio datetime comment 'esta fecha se guarda cuando se envia la fecha de registro de la factura',
                              NumeroTicketGastoVehicular varchar(250) not null,
                              FotoTicketGastoVehicular longtext);
alter table gastos_vehicular add column KmCarga decimal(10,2) default 0;
alter table gastos_vehicular add constraint rel_gasto_vehicular_vehiculo foreign key gastos_vehicular(FK_PlacaVehicular)
                             references vehiculo(PlacaVehiculo);
create table if not exists historial_empleado(idHistorialEmpleado int auto_increment primary key,
                           FKCodigoEmpleado varchar(50) null,fechaRegistro datetime default now(),fechaIngreso datetime default now(),fechaSalida datetime default now(),
                           fotoHistorialEmpleado text,notaHistorialEmpleado text,idTipoPermiso smallint(2) comment '1 -> Emfermedad , 2 -> permiso',
                           fechaHistorialPermiso datetime default now());
alter table historial_empleado add constraint rel_historial_empleado_empleado foreign key historial_empleado(FKCodigoEmpleado)
    references empleados(CodigoEmpleado);

/*** DE AQUI NINGUNA SENTENCIA SE EJECUTO **/

/**GASTO FALTA RELACIONAR CON SUCURSAL**/
alter table cliente add constraint rel_cliente_empresa foreign key cliente(FK_CodeEmpresa) references empresa(CodeEmpresa);
alter table gastos add constraint rel_gatos_usuario_admin foreign key gastos(FK_CodigoUsuarioAdmin) references usuario_admin(CodigoUsuarioAdmin);
alter table gastos add constraint rel_gatos_proveedor foreign key gastos(FK_CodigoProveedor) references proveedor(CodigoProveedor);

alter table ingresos add constraint rel_ingresos_sucursal foreign key ingresos(FK_Code_Sucursal) references sucursales(Code_Sucursal);

/*************************************************************************************************************************/

alter table historial_empleado add FKCodigoUsuarioAdmin varchar(50) comment 'usuario quien autoriza el pago';
/***** SELECT ***/
select * from vehiculo;
insert into gastos_vehicular(FK_PlacaVehicular, ValorGastoVehicular, FechaProximoServicio, NumeroTicketGastoVehicular,
                             FotoTicketGastoVehicular) VALUES ('44455',10.20,'2023-11-05','123121222','https://firebasestorage.googleapis.com/v0/b/ces-expres.appspot.com/o/vehi.jpg?alt=media');
select * from gastos_vehicular;
select * from trabajos;
select * from estado_trabajo;
select * from sucursales;
select E.CodigoEmpleado,E.FK_CodigoSucursal,E.FotoEmpleado,E.NombresApellidosEmpleado
       from empleados as E where E.FK_CodigoSucursal = 1 and E.NombresApellidosEmpleado like '%Nel%';




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



insert into proveedor(CodigoProveedor, NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
            EmailProveedor, CuentaBancaria)
            VALUES (unix_timestamp(),'PROVEEDOR 001','ECUADOR','078945613','proveedor01@gmail.com','11111111');
insert into proveedor(CodigoProveedor, NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
            EmailProveedor, CuentaBancaria)
            VALUES (unix_timestamp(),'PROVEEDOR 002','ECUADOR','078945613','proveedor01@gmail.com','11111111');
insert into proveedor(CodigoProveedor, NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
            EmailProveedor, CuentaBancaria)
            VALUES (unix_timestamp(),'PROVEEDOR 003','ECUADOR','078945613','proveedor01@gmail.com','11111111');
insert into proveedor(CodigoProveedor, NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
            EmailProveedor, CuentaBancaria)
            VALUES (unix_timestamp(),'PROVEEDOR 004','ECUADOR','078945613','proveedor01@gmail.com','11111111');

insert into estado_trabajo(detalle) values ('Pendiente');
insert into estado_trabajo(detalle) values ('En Proceso');
insert into estado_trabajo(detalle) values ('Finalizado');

alter table ingresos add column tipo_ingreso smallint(1) default 1 comment '1-> ingreso normal.... 2-> ingreso administrativo';


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
create procedure registerProveedor(in empresa varchar(50),in NombresApellidosProveedor_ varchar(250),
                                   in DirProveedor_ varchar(250), in TelefonoProveedor_ varchar(50),
                                 in EmailProveedor_ varchar(50),in CuentaBancaria_ varchar(250),
                                 in AtienddeProveedor_ varchar(250),
                                 in TelefonoEmpresa_ varchar(250),in DomicilioGoogle_ varchar(250))
begin

    declare idProveedor int default unix_timestamp();

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
    set idProveedor = (select unix_timestamp());
    insert into proveedor(CodigoProveedor, NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
                          EmailProveedor, CuentaBancaria, AtienddeProveedor,TelefonoEmpresa,DomicilioGoogle)
                VALUES (idProveedor,NombresApellidosProveedor_,DirProveedor_,TelefonoProveedor_,EmailProveedor_,
                        CuentaBancaria_,AtienddeProveedor_,TelefonoProveedor_,DomicilioGoogle_);
    insert into empresa_proveedor(FK_CodeEmpresa, FK_CodeProveedor)
                VALUES (empresa,idProveedor);
    select 200 as status_code;
    COMMIT;
end;

CREATE EVENT evento_notificacion
    ON SCHEDULE
        EVERY 1 DAY
            STARTS  '2023-09-29 05:00:00'
    COMMENT 'Este evento se ejecuta diariamente a las 5:00 AM'
    DO
    BEGIN
        -- Tu lógica aquí
        INSERT INTO notificacion (fecha_creacion, fk_code_sucursal, detalle, estado)
        SELECT NOW(),
               V.Fk_sucursal,
               CONCAT('Servicio correspondiente al vehiculo ', V.PlacaVehiculo, ' en la fecha ',
                      CONVERT(DATE(GV.FechaProximoServicio), char(150))),
               1
        FROM gastos_vehicular AS GV
                 INNER JOIN
             vehiculo AS V ON V.PlacaVehiculo = GV.FK_PlacaVehicular
                 INNER JOIN
             sucursales AS S ON S.Code_Sucursal = V.Fk_sucursal
        WHERE DATE(GV.FechaProximoServicio) = DATE(NOW());
    END ;

DELIMITER //

CREATE TRIGGER after_update_historial_empleado_sueldo
AFTER UPDATE ON historial_empleado
FOR EACH ROW
BEGIN
    if new.is_cobrado = 1 then
        insert into gastos(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura,
                   NotaFactura, QRealizo,
                   DateTimeRegistroGasto, FK_CodeEmpresa,
                   FK_CodigoUsuarioAdmin, FK_CodeSucursal) VALUES ('PAGO NOMINA','XXXXXXXXX',1,UNIX_TIMESTAMP(now()),
                   concat('PAGO DE SUELDO DIA',' ',date(new.fechaSalida)),
                   'SISTEMA AUTOMATICO',now(),(select usuario_admin.FK_CodeEmpresa from usuario_admin
                   where CodigoUsuarioAdmin = new.FKCodigoUsuarioAdmin),new.FKCodigoUsuarioAdmin,(select FK_CodigoSucursal from empleados
                   where CodigoEmpleado = new.FKCodigoEmpleado));
    end if;
END;
//

DELIMITER ;



use agro;
select * from sucursales;
select * from ingresos where FK_Code_Sucursal = 20;