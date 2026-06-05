package com.tax60sec.backend.controller;

import com.tax60sec.backend.entity.Contact;
import com.tax60sec.backend.repository.ContactRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(
        origins = {
                "https://tax60sec.com",
                "https://www.tax60sec.com",
                "http://localhost:3000"
        }
)
public class ContactController {

    private final ContactRepository repository;

    public ContactController(ContactRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Contact saveContact(
            @RequestBody Contact contact
    ) {
        return repository.save(contact);
    }

    @GetMapping
    public List<Contact> getContacts() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteContact(
            @PathVariable Long id
    ) {
        repository.deleteById(id);
    }
}