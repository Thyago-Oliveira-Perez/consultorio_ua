package br.com.uniamerica.api.service;

import br.com.uniamerica.api.entity.Especialidade;
import br.com.uniamerica.api.entity.Medico;
import br.com.uniamerica.api.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    public Optional<Medico> findById(Long id){return medicoRepository.findById(id);}

    public Page<Especialidade> findByName(Pageable pageable, String name){
        return this.medicoRepository.findAllByName(name, pageable);
    }

    public Page<Medico> listAll(Pageable pageable){return medicoRepository.findAll(pageable);}

    @Transactional
    public void insert(Medico medico){this.medicoRepository.save(medico);}

    @Transactional
    public void update(Medico medico, Long id){
        if(id.equals(medico.getId())) {
            this.medicoRepository.save(medico);
        }else{
            throw new RuntimeException();
        }
    }

    @Transactional
    public void updateStatus(Long id){

        Optional<Medico> medicoEntity = this.medicoRepository.findById(id);

        if(medicoEntity.isPresent()){
            this.medicoRepository.updateStatus(!medicoEntity.get().getAtivo(), id);
        }
        else{
            throw new RuntimeException();
        }
    }
}
