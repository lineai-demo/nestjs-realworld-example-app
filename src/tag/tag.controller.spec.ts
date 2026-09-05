import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { TagController } from './tag.controller.js';
import { TagService } from './tag.service.js';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TagEntity} from "./tag.entity.js";

describe('TagController', () => {
  let tagController: TagController;
  let tagService: TagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        TagService,
        { provide: getRepositoryToken(TagEntity), useValue: {} }
      ],
    }).compile();

    tagService = module.get<TagService>(TagService);
    tagController = module.get<TagController>(TagController);
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags : TagEntity[] = [];
      const createTag = (id, name) => {
        const tag = new TagEntity();
        tag.id = id;
        tag.tag = name;
        return tag;
      }
      tags.push(createTag(1, 'angularjs'));
      tags.push(createTag(2, 'reactjs'));

      jest.spyOn(tagService, 'findAll').mockImplementation(() => Promise.resolve(tags));
      
      const findAllResult = await tagController.findAll();
      expect(findAllResult).toBe(tags);
    });
  });
});