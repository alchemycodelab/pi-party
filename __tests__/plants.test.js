require('dotenv').config();

const { getPlants, getPlant, adminAgent } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('plant route tests', () => {
  it('posts a plant', async() => {
    return adminAgent
      .post('/api/v1/plants')
      .send({
        commonName: 'succulent',
        sunlightPreference: 'high'
      })
      .then(res => {
        expect(res.body).toEqual({
          commonName: 'succulent',
          sunlightPreference: 'high',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all plants', async() => {
    const plants = await getPlants();
    return request(app)
      .get('/api/v1/plants')
      .then(res => {
        plants.forEach(plant => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            commonName: plant.commonName,
            sunlightPreference: plant.sunlightPreference,
            __v: 0
          });
        });
      });
  });

  it('gets a plant by id', async() => {
    const plant = await getPlant();
    console.log(plant);
    return request(app)
      .get(`/api/v1/plants/${plant._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commonName: plant.commonName,
          sunlightPreference: plant.sunlightPreference,
          __v: 0
        });
      });
  });



});
