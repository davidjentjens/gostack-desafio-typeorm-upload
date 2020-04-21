import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

class ListTransactionsService {
  async execute(): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository
      .createQueryBuilder('transactions')
      .leftJoinAndSelect('transactions.category', 'category')
      .select([
        'transactions.id',
        'transactions.title',
        'transactions.value',
        'transactions.type',
        'category.id',
        'category.title',
      ])
      .getMany();

    return transactions;
  }
}

export default ListTransactionsService;
