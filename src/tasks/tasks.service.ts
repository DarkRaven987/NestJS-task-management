import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v1 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto
    let array = this.tasks;
    if (status) {
      array = array.filter(task => task.status === filterDto.status)
    }
    if (search) {
      array = array.filter(task => 
        task.title.includes(filterDto.search) || 
        task.description.includes(filterDto.search))
    }
    return array;
  }

  getTaskById(id: string): Task {
    const found =  this.tasks.find(task => task.id == id)

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' was not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto ): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      createdAt: new Date()
    }
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' was not found`)
    } else {
      this.tasks.filter(task => task.id !== found.id);
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (!TaskStatus[status]) {
      throw new NotFoundException(`Type of status '${status}' does not exist`)
    }
    task.status =  TaskStatus[status]
    return task;
  }
}
