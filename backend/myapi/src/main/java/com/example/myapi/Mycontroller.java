package com.example.myapi;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apicall")
@CrossOrigin(origins = "*")
public class Mycontroller {

    @Autowired
    Myreposit repo;

    @GetMapping("/get")
    public List<Data> give(){
        return repo.findAll();
    }

    @PostMapping("/post")
    public String add(@RequestBody Data input){
        repo.save(input);
        return "successfully added";
    }

    @PutMapping("/put/{index}")
    public String update(@PathVariable Long index,@RequestBody Data toupdate){
        if(repo.existsById(index)){
            toupdate.setId(index);
            repo.save(toupdate);
            return "successfully updated";
        }
        return "invalid index";
    }

    @DeleteMapping("/delete/{idx}")
    public String delete(@PathVariable Long idx){
        if(repo.existsById(idx)){
            repo.deleteById(idx);
            return "successfully deleted";
        }
        return "idx not present";
    }

}
