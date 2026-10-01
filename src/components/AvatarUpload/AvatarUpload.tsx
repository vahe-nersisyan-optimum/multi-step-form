"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState, type ChangeEvent, type DragEvent } from "react";
import { AVATAR_ACCEPTED_TYPES, AVATAR_MAX_SIZE_MB } from "@/lib/constants";
import { readFileAsDataUrl } from "@/lib/file";
import type { Avatar, ErrorCode } from "@/lib/types";
import { validateAvatarFile } from "@/lib/validation";
import styles from "./AvatarUpload.module.scss";

interface AvatarUploadProps {
  avatar: Avatar | null;
  error?: ErrorCode;
  onChange: (avatar: Avatar | null, error?: ErrorCode) => void;
}

const INPUT_ID = "avatar";
const HINT_ID = "avatar-hint";
const ERROR_ID = "avatar-error";

export function AvatarUpload({ avatar, error, onChange }: AvatarUploadProps) {
  const t = useTranslations("Avatar");
  const tErrors = useTranslations("Errors");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    const fileError = validateAvatarFile(file);

    if (fileError) {
      onChange(avatar, fileError);
      return;
    }

    onChange({ name: file.name, dataUrl: await readFileAsDataUrl(file) });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <span className={styles.label}>
          {t("label")} <span className={styles.optional}>({t("optional")})</span>
        </span>
        {error && (
          <span id={ERROR_ID} className={styles.error} role="alert">
            {tErrors(error, { size: AVATAR_MAX_SIZE_MB })}
          </span>
        )}
      </div>
      <div className={styles.row}>
        <div className={styles.preview}>
          {avatar ? (
            <Image
              src={avatar.dataUrl}
              alt={t("preview")}
              width={64}
              height={64}
              unoptimized
              className={styles.image}
            />
          ) : (
            <svg className={styles.placeholder} viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          )}
        </div>
        <label
          htmlFor={INPUT_ID}
          className={clsx(styles.dropzone, isDragging && styles.dragging, error && styles.invalid)}
          onDragEnter={handleDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id={INPUT_ID}
            type="file"
            accept={AVATAR_ACCEPTED_TYPES.join(",")}
            className={styles.input}
            aria-invalid={Boolean(error)}
            aria-describedby={clsx(HINT_ID, error && ERROR_ID)}
            onChange={handleInputChange}
          />
          <span className={styles.prompt}>{t("prompt")}</span>
          <span id={HINT_ID} className={styles.hint}>
            {t("hint", { size: AVATAR_MAX_SIZE_MB })}
          </span>
        </label>
      </div>
      {avatar && (
        <button type="button" className={styles.remove} onClick={() => onChange(null)}>
          {t("remove")}
        </button>
      )}
    </div>
  );
}
