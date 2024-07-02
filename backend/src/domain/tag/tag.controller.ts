import { ApiTags } from "@nestjs/swagger";
import { Controller, Body, Param, Query, HttpCode, HttpStatus, Get, Post, Put, Delete } from "@nestjs/common";

import TagService from "./tag.service";
import CreateTagDto from "./dtos/create-tag.dto";
import UpdateTagDto from "./dtos/update-tag.dto";

@ApiTags('Tag')
@Controller('tags')
class TagController {
    constructor(private readonly tagService: TagService) { };
};

export default TagController;