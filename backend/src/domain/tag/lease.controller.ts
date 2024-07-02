import { ApiTags } from "@nestjs/swagger";
import { Controller, Body, Param, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";

import Tag from "./models/tag.entity";
import TagService from "./tag.service";
import ShutTagDto from "./views/shut-tag-dto";
import LeaseTagDto from "./dtos/lease-tag.dto";
import ResponseDTO from "src/core/dtos/response.dto";

@ApiTags('Leases')
@Controller('leases')
class LeaseController {
    constructor(private readonly tagService: TagService) { };

    @Put()
    @HttpCode(HttpStatus.OK)
    async lease(@Body() leaseTagDto: LeaseTagDto): Promise<ResponseDTO<Tag>> {
        await this.tagService.lease(leaseTagDto);

        return ResponseDTO.success();
    };

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    async shut(@Param('id') id: number): Promise<ResponseDTO<ShutTagDto>> {
        const { cost, time } = await this.tagService.shut(id);

        return new ResponseDTO<ShutTagDto>({
            success: true,
            data: { cost, time }
        });
    };
};

export default LeaseController;