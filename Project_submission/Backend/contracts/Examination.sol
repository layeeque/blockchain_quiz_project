pragma solidity^0.4.17;
contract Examination {
    address public examiner;
    mapping (address => uint) public result;
    
    function Examination(uint8  a) public{
        examiner= msg.sender;
    }
    
     // Modifiers can be used to change
    // the body of a function.
    // If this modifier is used, it will
    // prepend a check that only passes
    // if the function is called from
    // a examiner address.
    modifier onlyByExaminer()
    {
        require(msg.sender == examiner);
        
        _;
    }
    modifier beforeStartingExam(address participant){
        result[participant]=0;
        true;
        _;
    }
    function participateInExame(address participant) public beforeStartingExam(participant) returns(uint) {
        return 0;
    }
    
     function addscore(address participant,uint score) public onlyByExaminer returns(uint){
        
        result[participant]=score;
        return score;
    }
    function getScore(address participant) public view returns(uint){
        return result[participant];
    } 

     function addParticipants(address[] participant) public view returns(uint){
         result[participant[0]]=0;
          result[participant[1]]=0;
           result[participant[2]]=0;
           return 0;
    }  

    function sayHello() public returns (string) {
return "HEllO WORLD !!!!!! ankit srivastava";
}  
}
