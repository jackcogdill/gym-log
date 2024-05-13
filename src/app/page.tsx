"use client";

import { ConnectionStatus } from "../lib/types";
import { connect, getExercises } from "./actions";
import { Component, ReactNode } from "react";

type HomeState = {
  connection: ConnectionStatus;
};

class Home extends Component<{}, HomeState> {
  state = {
    connection: ConnectionStatus.PENDING,
  };

  async componentDidMount() {
    this.setState({
      connection: await connect(),
    });
  }

  private getStatusClass(): string {
    switch (this.state.connection) {
      case ConnectionStatus.PENDING:
        return "bg-gray-500";
      case ConnectionStatus.CONNECTED:
        return "bg-green-500";
      case ConnectionStatus.DISCONNECTED:
        return "bg-red-500";
    }
  }

  render(): ReactNode {
    return (
      <main className="min-h-screen p-24">
        <form action={getExercises}>
          <input
            type="text"
            placeholder="Exercise"
            className="w-full p-4 rounded border border-neutral-200 bg-neutral-50 outline-none dark:bg-neutral-900 dark:border-neutral-700"
          ></input>
        </form>
        <div
          className={`${this.getStatusClass()} absolute bottom-10 right-10 rounded-full w-10 h-10`}
        ></div>
      </main>
    );
  }
}

export default Home;
