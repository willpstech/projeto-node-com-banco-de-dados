import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './modelo/produto';

@Injectable()
export class AppService {
  
  // Injeção de dependência do repositório de Produto
  constructor(
    @InjectRepository(Produto)
    private produtoRepositorio: Repository<Produto>
  ){ }

  // Método para listar todos os produtos
  public listarTodos(): Promise<Produto[]>{
    return this.produtoRepositorio.find();
  }

  // Método para buscar um produto por ID
  public async buscarPorId(id:number): Promise<Produto> {
    const produto = await this.produtoRepositorio.findOneBy({ id });

    //Verifica se o cliente existe no banco de dados
    if (!produto) {
      throw new NotFoundException('Produto não foi encontrado');
    }

    return produto;
  }

  // Método para salvar um novo produto
  public async salvar(produto:Produto): Promise<Produto>{
    const novoProduto = await this.produtoRepositorio.save(produto);
    return novoProduto;
  }

  // Método para atualizar um produto
  public async atualizar(id:number, produto:Produto): Promise<Produto>{
    const editProduto = await this.produtoRepositorio.findOneBy({ id });

    //Verifica se o cliente existe no banco de dados
    if (!editProduto) {
      throw new NotFoundException('Produto não foi encontrado');
    }

    editProduto.descricao = produto.descricao;
    editProduto.marca = produto.marca;
    editProduto.valor = produto.valor;

    //Salva as alterações
    await this.produtoRepositorio.save(editProduto);

    //Retorna o registro alterado
    return editProduto;
  }

  // Método para excluir um produto
  public async excluir(id:number): Promise<void>{
    await this.produtoRepositorio.delete(id)
  }
}