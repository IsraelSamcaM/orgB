const router = require('express').Router()
const { request, response, text } = require('express');

const jobService = require('../services/job.service')

router.get('', async (req = request, res = response) => {
    try {
        const jobs = await jobService.get()
        return res.status(200).json({
            ok: true,   
            jobs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})
///metodo de escala salarial 
router.get('/escala', async (req = request, res = response) => {
    try {
        const salarios = await jobService.getEscalaSalarial()
        return res.status(200).json({
            ok: true,   
            salarios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})

router.get('/totalEscala', async (req = request, res = response) => {
    try {
        const totalSalarios = await jobService.getTotalEscalaSalarial()
        return res.status(200).json({
            ok: true,   
            totalSalarios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,  
            message: 'Error in server'
        })
    }
})

router.get('/escalaPartidaPresupuestaria', async (req = request, res = response) => {
    try {
        const totalSalariosPartida = await jobService.getEscalaSalarialPartidaPresupuestaria()
        return res.status(200).json({
            ok: true,   
            totalSalariosPartida    
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,  
            message: 'Error in server'
        })
    }
})

router.get('/escalaPartidaPresupuestariaTotal', async (req = request, res = response) => {
    try {
        const totalSalariosPartidaTotal = await jobService.getEscalaSalarialPartidaPresupuestariaTotal()
        return res.status(200).json({
            ok: true,   
            totalSalariosPartidaTotal    
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,  
            message: 'Error in server'
        })
    }
})

router.get('/totalGlobalItems', async (req = request, res = response) => {
    try {
        const globalSalariosItemTotal = await jobService.getItemsGlobalTotal()
        return res.status(200).json({
            ok: true,   
            globalSalariosItemTotal    
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,  
            message: 'Error in server'
        })
    }
})

router.get('/totalGlobalSecretarias', async (req = request, res = response) => {
    try {
        const globalSecretarias = await jobService.getGlobalSecretaria()
        return res.status(200).json({
            ok: true,   
            globalSecretarias    
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,  
            message: 'Error in server'
        })
    }
})


router.get('/:text', async (req = request, res = response) => {
    try {
        const jobs = await jobService.search(req.params.text)
        return res.status(200).json({
            ok: true,
            jobs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})
router.get('/search/job/officer/:text', async (req = request, res = response) => {
    try {
        const jobs = await jobService.searchJobForUser(req.params.text)
        return res.status(200).json(jobs)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})
router.get('/organization/data', async (req = request, res = response) => {
    try {
        const data = await jobService.getOrganization()
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})
router.get('/search/dependents/:text', async (req = request, res = response) => {
    try {
        const jobs = await jobService.searchDependents(req.params.text)
        return res.status(200).json(jobs)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})
router.get('/dependents/:id', async (req = request, res = response) => {
    try {
        const jobs = await jobService.getDependentsOfSuperior(req.params.id)
        return res.status(200).json(jobs)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})
router.delete('/dependent/:id', async (req = request, res = response) => {
    try {
        const jobs = await jobService.removeDependent(req.params.id)
        return res.status(200).json(jobs)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})

router.post('', async (req = request, res = response) => {
    try {
        const job = req.body.job
        const jobDetail = req.body.jobDetail
        const newJob = await jobService.add(job,jobDetail)
        return res.status(200).json(newJob)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})

router.put('/:id', async (req = request, res = response) => {
    try {
        const jobDetail = req.body.jobDetail
        const job = req.body.job
        //const job = await jobService.edit(req.params.id, req.body)
        const newJob = await jobService.edit(req.params.id, job ,jobDetail)
        return res.status(200).json(newJob)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error in server'
        })
    }
})


router.get('/JoinLevel', jobService.getJoinLevel);

module.exports = router