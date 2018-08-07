import bodyParser = require('body-parser')
import cors =  require('cors')
import express = require('express')
import * as http from 'http'
import morgan = require('morgan')
import 'reflect-metadata'
import * as requestIp from 'request-ip'
import { createConnection } from 'typeorm'
import { AlbumController } from './controllers/AlbumController'

// tslint:disable-next-line:no-var-requires
const ormconfig =  require('../ormconfig.json')

// tslint:disable-next-line:no-var-requires
const config =  require('../config.json')

createConnection()
    .then(() => {
        const app: any = express()
        const port: number =  parseInt(process.env.API_PORT, 0) || 8080
        app.server = http.createServer(app)

        // logger
        app.use(morgan('dev'))

        // 3rd party middleware
        app.use(
            cors({
            exposedHeaders: config.corsHeaders
            })
        )

        app.use(
            bodyParser.json({
            limit: config.bodyLimit
            })
        )

        app.set('port', port)

        app.listen(port, async () => {
            console.log('Node app is running on port', port)
        })

        /* ROUTES */
        app.get('/', (req, res) => {
            const clientIp: string = requestIp.getClientIp(req)
            const response: object = { yourIp: clientIp, time: new Date().toISOString() }
            res.status(200).send(response)
        })

        /* ALBUMS */

        app.get('/albums', async (req, res, next) => {
            const controller = new AlbumController()
            let albums = null
            try {
                albums = await controller.getAll()
            } catch (error) {
                return next(error)
            }
            return res.status(200).send(albums)
        })

        app.get('/albums/:id', async (req, res, next) => {
            const controller: AlbumController = new AlbumController()
            let album = null
            try {
                album = await controller.getOne(req.params.id)
            } catch (error) {
                return next(error.message)
            }
            return res.status(200).send(album)
        })

        app.post('/albums', async (req, res, next) => {
            const controller: AlbumController = new AlbumController()
            let album = null
            try {
                album = await controller.post(req.body.album)
            } catch (error) {
                return next(error.message)
            }
            return res.status(200).send(album)
        })

        app.patch('/albums/:id', async (req, res, next) => {
            const controller: AlbumController = new AlbumController()
            let album = null
            try {
                album = await controller.patch(req.params.id, req.body.album)
            } catch (error) {
                return next(error.message)
            }
            return res.status(200).send(album)
        })

        app.delete('/albums/:id', async (req, res, next) => {
            const controller: AlbumController = new AlbumController()
            let result
            try {
                result = await controller.remove(req.params.id)
            } catch (error) {
                return next(error.message)
            }
            return res.status(200).send(result)
        })
    })
    .catch(( err ) => console.log('Error', err))
