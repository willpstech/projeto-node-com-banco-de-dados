import { 
  Controller, Get, Post, Put, Delete, Query, Body, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { Produto } from './modelo/produto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //Exemplo: http://localhost:3000
  getStatus(): string {
    return "Node está rodando: " + new Date();
  }

  @Get("/produtos") //Exemplo: http://localhost:3000/produtos
  listarTodosProdutos(){
    console.log("Entrou no método: listarTodosProdutos "+ new Date());

    return this.appService.listarTodos();
  }

  @Get("/produto") //Exemplo: http://localhost:3000?id=1
  public buscarPorId(@Query('id') id:number) {
    console.log("Entrou no método: buscarPorId "+ new Date());

    return this.appService.buscarPorId(id);
  }

  @Post()
  public salvar(@Body() produto:  Produto) {
    console.log("Entrou no método: salvar");

    return this.appService.salvar(produto);
  }

  @Put(':id')
  public alterar(@Param('id') id: number, @Body() produto: Produto ){
    console.log("Entrou no método: alterar "+ new Date());
      
    return this.appService.atualizar(id, produto);
  }

  @Delete(':id')
  public excluir(@Param('id') id: number){
    console.log("Entrou no método: delete "+ new Date());

    this.appService.excluir(id);
  }
}