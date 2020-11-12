const axios = require('axios');

const API_URL = 'https://api.bitbucket.org';
const API_VERSION = '2.0';

function Bitbucket(username, password, logger) {
  this.apiUrl = `${API_URL}/${API_VERSION}`;
  this.username = username;
  this.password = password;
  this.logger = logger;
}

Bitbucket.prototype.getPrivileges = function getPrivileges() {
  const { username, password, apiUrl } = this;
  const teams = {};

  function callApi(url) {
    return axios({
      method: 'get',
      url,
      auth: { username, password },
    }).then((response) => {
      response.data.values.forEach(
        ({ permission, workspace }) => {
          teams[workspace.name] = permission;
        },
      );

      if (response.data.next) {
        return callApi(response.data.next);
      }

      return { teams };
    });
  }

  return callApi(`${apiUrl}/user/permissions/workspaces`);
};

module.exports = Bitbucket;
