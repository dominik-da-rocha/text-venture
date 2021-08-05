using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyAudio
{
  public class MyTriangleWaveProvider32 : MyWaveProvider32
  {
    private int sample = 0;

    public override int Read(float[] buffer, int offset, int sampleCount)
    {
      float sampleRate = WaveFormat.SampleRate;
      float quaterPeriode = 0.25f / Frequency;
      float threeQuaterPeriode = 0.75f / Frequency;
      float periode = 1.0f / Frequency;
      float slope = 4 * Frequency * Amplitude;

      for (int n = 0; n < sampleCount; n++)
      {
        float time = sample / sampleRate;
        sample++;

        if (time <= quaterPeriode)
          buffer[n + offset] = slope * time;
        else if (time <= threeQuaterPeriode)
          buffer[n + offset] = -slope * time + 2 * Amplitude;
        else if (time <= periode)
        {
          buffer[n + offset] = slope * time - 4 * Amplitude;
        }
        else
        {
          buffer[n + offset] = 0.0f;
          sample = 0;
        }
      }

      return sampleCount;
    }
  }
}
