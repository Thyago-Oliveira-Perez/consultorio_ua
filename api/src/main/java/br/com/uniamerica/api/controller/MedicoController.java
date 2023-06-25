package br.com.uniamerica.api.controller;

import br.com.uniamerica.api.entity.Especialidade;
import br.com.uniamerica.api.entity.Medico;
import br.com.uniamerica.api.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @GetMapping("/{idMedico}")
    public ResponseEntity<Medico> getById(@PathVariable("idMedico") Long idMedico)
    {
        return ResponseEntity.ok().body(this.medicoService.findById(idMedico).get());
    }

    @GetMapping("/search/{nameEspecialidade}")
    public ResponseEntity<Page<Especialidade>> findByName(Pageable pageable, @PathVariable("nameEspecialidade")String nameEspecialidade)
    {
        return ResponseEntity.ok().body(this.medicoService.findByName(pageable, nameEspecialidade));
    }

    @GetMapping
    public ResponseEntity<Page<Medico>> findAll(Pageable pageable)
    {
        return ResponseEntity.ok().body(this.medicoService.listAll(pageable));
    }

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody Medico medico)
    {
        try{
            this.medicoService.insert(medico);
            return ResponseEntity.ok().body(("Medico Cadastro com Sucesso!"));
        }catch(RuntimeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{idMedico}")
    public ResponseEntity<?> update(@PathVariable("idMedico") Long idMedico,
                                    @RequestBody Medico medico)
    {
        try{
            this.medicoService.update(medico, idMedico);
            return ResponseEntity.ok().body(("Medico Atualizado com Sucesso!"));
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/status/{idMedico}")
    public ResponseEntity<?> updateStatus(@PathVariable("idMedico") Long idMedico)
    {
        try{
            this.medicoService.updateStatus(idMedico);
            return ResponseEntity.ok().body(("Medico Desativado com Sucesso!"));
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body("Médico não existe no banco.");
        }
    }

}
