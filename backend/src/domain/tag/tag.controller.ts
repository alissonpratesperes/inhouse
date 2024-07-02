import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Controller, Body, Param, Query, HttpCode, HttpStatus, Get, Post, Put, Delete } from "@nestjs/common";

import Tag from "./models/tag.entity";
import TagService from "./tag.service";
import GetTagDto from "./views/get-tag.dto";
import ListTagDto from "./views/list-tag.dto";
import CreateTagDto from "./dtos/create-tag.dto";
import UpdateTagDto from "./dtos/update-tag.dto";
import ResponseDTO from "src/core/dtos/response.dto";
import PaginationDTO from "src/core/dtos/pagination.dto";

@ApiTags('Tags')
@Controller('tags')
class TagController {
    constructor(private readonly tagService: TagService) { };

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() createTagDto: CreateTagDto): Promise<ResponseDTO<Tag>> {
        await this.tagService.create(createTagDto);

        return ResponseDTO.success();
    };

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async read(@Param('id') id: number): Promise<ResponseDTO<GetTagDto>> {
        const getted = await this.tagService.read(id);

        return new ResponseDTO<GetTagDto>({ success: !!getted, data: getted });
    };

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'search', required: false })
    async list(@Query('page') page: string = "1", @Query('limit') limit: string = '10', @Query('search') search: string = ''): Promise<ResponseDTO<PaginationDTO<ListTagDto>>> {
        const listed = await this.tagService.list(parseInt(page), parseInt(limit), search);

        return new ResponseDTO<PaginationDTO<ListTagDto>>({ success: !!listed, data: listed });
    };

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto): Promise<ResponseDTO<Tag>> {
        await this.tagService.update(id, updateTagDto);

        return ResponseDTO.success();
    };

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number): Promise<ResponseDTO<Tag>> {
        await this.tagService.delete(id);

        return ResponseDTO.success();
    };
};

export default TagController;