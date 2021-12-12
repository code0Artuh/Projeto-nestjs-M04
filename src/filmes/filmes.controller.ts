/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { ApiBody,  ApiCreatedResponse,  ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('filmes')
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post('add')
  @ApiBody({
    schema: {
      properties: {
        nome: { example: 'Artur'},
        imagemUrl: { example: 'imagem.jpeg' },
        duracao: { example: 1 },
        genero_id: { example: 1 }
      }
    }
  })
  @ApiCreatedResponse({ description: 'A new film has been created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createFilmeDto: CreateFilmeDto) {
    return this.filmesService.create(createFilmeDto);
  }



  @Get('listall')
  @ApiOkResponse(
    {
      description:'Listed all films',
      schema: {
        properties: {
          id: { example: 1 },
          nome: { example: 'Artur'},
          imagemUrl: { example: 'imagem.jpeg' },
          data_lancamento: { example: '2021-12-12T19:46:00.521Z' },
          duracao: { example: 1 },
          genero_id: { example: 1 },
          Participantes: { example: [{id:1}]}
        }
      }
    }
  )
  @ApiNotFoundResponse({ description: 'bad request' })
  findAll() {
    return this.filmesService.findAll();
  }



  @Get('listid/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do filme' })
  @ApiOkResponse(
    { 
      description:'A film has been listed',
      schema: {
        properties: {
          id: { example: 1 },
          nome: { example: 'Artur'},
          imagemUrl: { example: 'imagem.jpeg' },
          data_lancamento: { example: '2021-12-12T19:46:00.521Z' },
          duracao: { example: 1 },
          genero_id: { example: 1 },
          Participantes: { example: [{id:1}]}
        }
      } 
    }
  )
  @ApiNotFoundResponse({ description:'ID not found' })
  findOne(@Param('id') id: string) {
    return this.filmesService.findOne(+id);
  }



  @Patch('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do filme' })
  @ApiBody({
    schema: {
      properties: {
        genero_id: { example: 1 }
      }
    }
  })
  @ApiOkResponse({ description: 'Updated' })
  @ApiNotFoundResponse({ description:'ID not found' })
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    return this.filmesService.update(+id, updateFilmeDto);
  }




  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do filme' })
  @ApiOkResponse({ description: "A film has been deleted" })
  @ApiNotFoundResponse({ description:'ID not found' })
  remove(@Param('id') id: string) {
    return this.filmesService.remove(+id);
  }
}
