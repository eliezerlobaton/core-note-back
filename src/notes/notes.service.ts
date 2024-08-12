import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(dto: CreateNoteDto) {
    const note = await this.noteRepository.save(dto);
    return note;
  }

  async findAll(filters?: { color_title?: string; favorite?: boolean }) {
    const queryBuilder = this.noteRepository.createQueryBuilder('note');

    if (filters?.color_title) {
      queryBuilder.andWhere('note.color_title = :color_title', {
        color_title: filters.color_title,
      });
    }

    if (filters?.favorite !== undefined) {
      queryBuilder.andWhere('note.favorite = :favorite', {
        favorite: filters.favorite,
      });
    }

    // queryBuilder.orderBy('note.favorite', 'DESC');

    const notes = await queryBuilder.getMany();
    return notes;
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOneBy({ id });
    return note;
  }

  async update(id: number, dto: UpdateNoteDto) {
    const note = await this.findOne(id);
    Object.assign(note, dto);
    return await this.noteRepository.save(note);
  }

  async remove(id: number): Promise<string> {
    const result = await this.noteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return `Note with ID ${id} has been successfully removed`;
  }
}
