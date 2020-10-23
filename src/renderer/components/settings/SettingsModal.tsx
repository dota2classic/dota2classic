import {observer} from "mobx-react";
import React from "react";
import styled from "styled-components";
import {remote} from "electron";
import {colors} from "../../shared";
import {useStores} from "../../store";

const Modal = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 80%;
  height: 60%;
  background: #1d1f22;

  padding: 40px;
  border-radius: 4px;

  box-shadow: 0 0 30px 10px rgba(150, 150, 150, 0.25);

  display: flex;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const Label = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-family: "Trajan Pro 3", sans-serif;

  outline: none;
  width: fit-content;
  padding: 8px;
  align-self: center;

  background: ${colors.evenDarkerBg};

  font-size: 12px;
  border: 1px solid rgba(24, 24, 24, 0.1);
  color: ${colors.primaryText};

  transition: 0.3s ease;
  cursor: pointer;
  flex: 1;
  margin-right: 20px;
`;

const Button = styled.button`
  font-family: "Trajan Pro 3";

  outline: none;
  width: fit-content;
  padding: 8px;
  margin-top: 20px;

  background: ${colors.evenDarkerBg};

  font-size: 14px;
  border: 1px solid rgba(24, 24, 24, 0.1);
  //border-radius: 4px;
  color: ${colors.primaryText};

  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgb(13, 13, 14);
    border: 1px solid rgba(24, 24, 24, 0.8);
    border-radius: 10px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 24px;
  color: white;
`;
export const SettingsModal = observer(() => {
  const stores = useStores();

  if (!stores.settings.settingsOpen) return null;
  return (
    <ModalWrapper>
      <Modal>
        <Title>Настройки</Title>
        <Label>Путь к игре</Label>

        <Field>
          <Input
            onClick={() => {
              const s = remote.dialog.showOpenDialog({
                properties: ["openFile"],
                filters: [{ extensions: ["exe", "ts"], name: "Dota 2" }],
              });

              if (s) {
                stores.settings.set681Path(s[0]);
              }
            }}
            readOnly
            value={stores.settings.path_681}
          />
        </Field>

        <div style={{ flex: 1 }} />
        <Button
          onClick={() => {
            stores.settings.settingsOpen = false;
          }}
        >
          Закрыть
        </Button>
      </Modal>
    </ModalWrapper>
  );
});
