const moxios = require('moxios');

const Bitbucket = require('../models/Bitbucket');

describe('Bitbucket', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('#getPrivileges', () => {
    it('should return the privileges', () => {
      expect.assertions(1);
      moxios.stubRequest(/^https:\/\/api.bitbucket.org\/2.0\/user\/permissions\/workspaces$/, {
        status: 200,
        response: {
          values: [
            {
              permission: 'owner',
              workspace: {
                name: 'My first workspace',
              },
            },
            {
              permission: 'collaborator',
              workspace: {
                name: 'My second workspace',
              },
            },
            {
              permission: 'member',
              workspace: {
                name: 'My third workspace',
              },
            },
          ],
        },
      });
      return new Bitbucket('u', 'p', console).getPrivileges().then((response) => {
        expect(response).toEqual({
          teams: {
            'My first workspace': 'owner',
            'My second workspace': 'collaborator',
            'My third workspace': 'member',
          },
        });
      });
    });

    it('should follow next page links', () => {
      moxios.stubRequest(/^https:\/\/api.bitbucket.org\/2.0\/user\/permissions\/workspaces$/, {
        status: 200,
        response: {
          next: 'https://example.org/page2',
          values: [
            {
              permission: 'owner',
              workspace: {
                name: 'My first workspace',
              },
            },
          ],
        },
      });
      moxios.stubRequest('https://example.org/page2', {
        status: 200,
        response: {
          values: [
            {
              permission: 'collaborator',
              workspace: {
                name: 'My second workspace',
              },
            },
          ],
        },
      });
      return new Bitbucket('u', 'p', console).getPrivileges().then((response) => {
        expect(response).toEqual({
          teams: {
            'My first workspace': 'owner',
            'My second workspace': 'collaborator',
          },
        });
      });
    });
  });
});
