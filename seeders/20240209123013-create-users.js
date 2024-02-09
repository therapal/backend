"use strict";
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("Password$1", salt);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: crypto.randomUUID(),
          fullName: "Elijah J",
          role: "therapist",
          password: hash,
          email: "jonjoh121@gmail.com",
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          fullName: "Jah E",
          role: "client",
          password: hash,
          email: "456godspeed@gmail.com",
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          fullName: "Jah E",
          role: "client",
          password: hash,
          email: "mail@gmail.com",
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          fullName: "Tp1 T",
          role: "therapist",
          password: hash,
          email: "elijaheze777@gmail.com",
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert("categories", [
      {
        id: crypto.randomUUID(),
        title: "Marriage and family counsellor",
        description:
          "This type of counsellor focuses on the behaviours of individuals inside a marriage or on the actions of family members individually. They look at the ties between family members. In marriage and family counselling, the therapist frequently separates the treatment into time spent separately and together as a couple or family. You may also call them family counsellors, marriage counsellors, or couple's counsellors.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Addiction therapist",
        description:
          "Addiction therapists are counsellors who have received further training to assist their clients in overcoming substance misuse challenges. They may assist their clients in processing past events that may have contributed to their addiction. Some addiction therapists work with clients alone, while others work in a group setting with a group of people struggling with addiction and may share their own stories and offer support to one another.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Divorce therapist",
        description:
          "A divorce therapist is a counsellor who assists couples experiencing marital difficulties and believes they are on the verge of divorce. Divorce therapists frequently work with each partner separately and with the couple. Divorce therapists often cover communication, infidelity, injustice, and abuse during this type of counselling.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("categories", null, {});
  },
};
