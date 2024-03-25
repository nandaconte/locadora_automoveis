create database locadora_automoveis
use locadora_automoveis;
create table  tbl_clientes(
cpf char (12) primary key,
nome char(100) not null,
endereco varchar(255) not null,
telefone char (15) not null,
email char (100));
select * from tbl_veiculos;
create table tbl_veiculos(
placa char (10) primary key,
marca char (100) not null,
modelo char (50) not null,
ano char (4) not null);

create table tbl_reservas(
id_reserva int auto_increment primary key,
cpf char (12),
placa char(10),
dataInicio date,
dateFim date,
foreign key (cpf) references tbl_clientes(cpf),
foreign key (placa) references  tbl_veiculos(placa));