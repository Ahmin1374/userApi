import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../service/users/users.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';


describe('UsersController', () => {
  const mockUserService =  <jest.Mocked<UsersService>>UsersService.prototype;
  const controller: UsersController = new UsersController(mockUserService);
  const mockUserData = [        
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
      },
  {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
  }
];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[UsersService],
    }).compile();

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers',() =>{
    it('should get All users',() => {   
      jest.spyOn(mockUserService, 'getAllUsers').mockImplementation(() => Promise.resolve(mockUserData));
      controller.getAllUsers().then(data => expect(data.length).toEqual(2));      
      expect(mockUserService.getAllUsers).toHaveBeenCalledTimes(1);
    });

  });

  describe('getUserByID', () => {

    

    it('should get user', ()=>{
      const user = mockUserData[0];
      jest.spyOn(mockUserService, 'getUserByID').mockImplementation(() => Promise.resolve(user));
      controller.getUserByID(user.id).then(data =>  expect(data).toEqual(user));
      expect(mockUserService.getUserByID).toHaveBeenCalledWith(user.id);
      
    });

    it('should throw error not found', ()=>{
      
      jest.spyOn(mockUserService, 'getUserByID').mockImplementation(() => {throw new NotFoundException('User does not exist')} );
      const result = controller.getUserByID(10)
      expect(mockUserService.getUserByID).toHaveBeenCalledWith(10);
      expect(result).rejects.toThrow();

    });

   
  })

  
});
