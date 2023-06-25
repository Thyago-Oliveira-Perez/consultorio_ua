package br.com.uniamerica.api.controller;

import br.com.uniamerica.api.entity.Especialidade;
import br.com.uniamerica.api.entity.Secretaria;
import br.com.uniamerica.api.service.SecretariaService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.print.DocFlavor;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/secretarias")
public class SecretariaController {

    @Autowired
    public SecretariaService secretariaService;

    @GetMapping("/{idSecretaria}")
    public ResponseEntity<Secretaria> getById(@PathVariable("idSecretaria")Long idSecretaria)
    {
        return ResponseEntity.ok().body(this.secretariaService.findById(idSecretaria).get());
    }

    @GetMapping("/search/{nameSecretaria}")
    public ResponseEntity<Page<Especialidade>> findByName(Pageable pageable, @PathVariable("nameSecretaria")String nameSecretaria)
    {
        return ResponseEntity.ok().body(this.secretariaService.findByName(pageable, nameSecretaria));
    }

    @GetMapping
    public ResponseEntity<Page<Secretaria>> findAll(Pageable pageable)
    {
        return ResponseEntity.ok().body(this.secretariaService.listAllHabilitados(pageable));
    }

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody Secretaria secretaria)
    {
        try{
            this.secretariaService.insert(secretaria);
            return ResponseEntity.ok().body(("Secretaria Cadastrada com Sucesso!"));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{idSecretaria}")
    public ResponseEntity<?> update(@PathVariable("idSecretaria")Long idSecretaria,
                                    @RequestBody Secretaria secretaria)
    {
        try{
            this.secretariaService.update(secretaria, idSecretaria);
            return ResponseEntity.ok().body(("Secretaria Atualizada com Sucesso!"));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/status/{idSecretaria}")
    public ResponseEntity<?> updateStatus(@PathVariable("idSecretaria")Long idSecretaria)
    {
        try{
            this.secretariaService.updateStatus(idSecretaria);
            return ResponseEntity.ok().body(("Secretaria Desativada com Sucesso!"));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body("Secretaria não existe no banco.");
        }
    }
}
