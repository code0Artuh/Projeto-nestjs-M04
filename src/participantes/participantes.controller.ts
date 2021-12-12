/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { CreateParticipanteDto } from './dto/create-participante.dto';
import { UpdateParticipanteDto } from './dto/update-participante.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('participantes')
@Controller('participantes')
export class ParticipantesController {
  constructor(private readonly participantesService: ParticipantesService) {}

  @Post('add')
  @ApiBody({
    schema: {
      properties: {
        nome: { example: 'Artur'},
        imagemUrl: { example: 'imagem.jpeg' },
        nascimento: { example: '1997-05-27T00:00:00.000Z' },
        filme_id: { example: 1 },
      }
    }
  })
  @ApiCreatedResponse({ description: 'Participante has been created' })
  @ApiBadRequestResponse({ description: 'bad request' })
  create(@Body() createParticipanteDto: CreateParticipanteDto) {
    return this.participantesService.create(createParticipanteDto);
  }



  @Get('listall')
  @ApiOkResponse(
    {
      description:'All participantes successfully listed',
      schema: {
        properties: {
          id: { example: 1 },
          nome: { example: 'Artur'},
          imagemUrl: { example: 'artur.jpeg' },
          nascimento: { example: '1997-05-27T00:00:00.000Z' },
          filme_id: {  example: 1 },
        }
      }
    }
  )
  @ApiNotFoundResponse({ description: 'bad request' })
  findAll() {
    return this.participantesService.findAll();
  }




  @Get('listid/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do participante' })
  @ApiOkResponse(
    { 
      description:'Participante founded',
      schema: {
        properties: {
          id: { example: 1 },
          nome: { example: 'Artur'},
          imagemUrl: { example: 'artur.jpeg' },
          nascimento: { example: '1997-05-27T00:00:00.000Z' },
          filme_id: {  example: 1 }
        }
      } 
    }
  )
  @ApiNotFoundResponse({ description:'ID not found' })
  findOne(@Param('id') id: string) {
    return this.participantesService.findOne(+id);
  }




  @Patch('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do participante' })
  @ApiBody({
    schema: {
      properties: {
        nome: { example: 'Artur'}
      }
    }
  })
  @ApiOkResponse({ description: 'Successfully updated' })
  @ApiNotFoundResponse({ description:'ID not found' })
  update(@Param('id') id: string, @Body() updateParticipanteDto: UpdateParticipanteDto) {
    return this.participantesService.update(+id, updateParticipanteDto);
  }


  

  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do participante' })
  @ApiOkResponse({ description: 'Successfully deleted' })
  @ApiNotFoundResponse({ description:'ID not found' })
  remove(@Param('id') id: string) {
    return this.participantesService.remove(+id);
  }
}
