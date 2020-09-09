"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with Useres
 */
class UserController {
  /**
   * Show a list of all Useres.
   * GET Useres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const users = await User.all();
    return users;
  }

  /**
   * Create/save a new User.
   * POST Useres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["name", "email", "birthDate", "phone"]);
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.error(error);
      if (error.code === "SQLITE_CONSTRAINT") {
        return response.status(409).send();
      }
    }
  }
}

module.exports = UserController;
