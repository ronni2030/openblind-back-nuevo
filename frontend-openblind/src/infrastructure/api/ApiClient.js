/**
 * Cliente HTTP para comunicación con el backend
 * Maneja las peticiones HTTP y errores
 */
export class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Realizar petición GET
   * @param {string} endpoint
   * @returns {Promise<any>}
   */
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  /**
   * Realizar petición POST
   * @param {string} endpoint
   * @param {Object} data
   * @returns {Promise<any>}
   */
  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  /**
   * Realizar petición PUT
   * @param {string} endpoint
   * @param {Object} data
   * @returns {Promise<any>}
   */
  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  /**
   * Realizar petición DELETE
   * @param {string} endpoint
   * @returns {Promise<any>}
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }
}
